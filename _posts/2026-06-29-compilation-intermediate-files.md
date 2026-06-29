---
layout: post
title: "Compilation Intermediate Files"
date: 2026-06-29 06:20
comments: false
categories:
draft: false
---

# Looking Inside the Compiler: `.i`, `.bc`, and IR

A lab built around files you generate and read. The rule for the whole sheet:
**don't trust the explanation — generate the file and look.**

## The pipeline map (keep this in front of you)

`clang` is not a single program. It is a *driver* that runs a chain of tools,
and each tool hands a file to the next:

```
 file.c
   │  preprocessor        clang -E
   ▼
 file.i      ← preprocessed C: still text, all #includes pasted in
   │  clang front-end     (parse  →  generate LLVM IR)
   ▼
 IR  (.ll text / .bc binary)   ← the same program, now in LLVM's language
   │  LLVM back-end       clang -S
   ▼
 file.s      ← native assembly for this CPU
   │  assembler           clang -c
   ▼
 file.o      ← machine code, not yet linked
   │  linker
   ▼
 a.out       ← executable
```

The single most important idea on this sheet: **clang always passes through
LLVM IR.** It never turns C straight into assembly. The `.ll`/`.bc` files just
let you *see* a step that is always happening.

To dump every stage at once:

```
clang --save-temps -c file.c
```

---

# Concept 1 — `#include` is literal text insertion

### a. What we set up / save in a file

Run *only* the preprocessor and save its output as a `.i` file:

```
clang -E hello.c -o hello.i
```

`-E` = "stop after preprocessing." The `.i` file is the exact text the rest of
the compiler will actually see. Nothing in it knows the word `#include` anymore.

Example files to create:

```c
/* hello.c */
#include <stdio.h>
int main(void) {
    printf("Hello\n");
    return 0;
}
```

```c
/* util.h */
int add(int a, int b);

/* use.c */
#include "util.h"
int main(void) { return add(1, 2); }
```

```c
/* bare.c  — no includes at all */
int main(void) { return 0; }
```

### b. Task

1. For each file, generate the `.i` and compare sizes:
   ```
   clang -E hello.c -o hello.i
   wc -l hello.c hello.i
   ```
2. Do the same for `use.c` and `bare.c`. Line up the three before/after counts.
3. In `hello.i`, find the line where `printf` is actually declared:
   ```
   grep -n "int printf" hello.i
   ```
4. In `use.i`, find the line you wrote in `util.h`:
   ```
   grep -n "int add" use.i
   ```
5. Open `bare.i` and read the *whole* thing.

### c. Observation (what you should find)

- `hello.c` is ~7 lines; `hello.i` is **several hundred** (on a typical Linux
  box, well over 800). One `#include <stdio.h>` dragged in the entire contents
  of `stdio.h` *and every header stdio.h itself includes*.
- The declaration `extern int printf(...)` is physically sitting inside
  `hello.i` — it was copied there from the system header. Your program didn't
  "import" printf; the text of its declaration was pasted in.
- The line `int add(int a, int b);` you wrote in `util.h` appears verbatim near
  the top of `use.i`. `#include "util.h"` did nothing more clever than copy-paste.
- `bare.i` has almost nothing in it — proof that the bulk of `hello.i` came
  *entirely* from the `#include`, not from your code.

**Takeaway to say out loud:** `#include` is a copy-paste of one file's text into
another, performed before the compiler runs. That is the whole feature.

---

# Concept 2 — How error messages still point at *your* line

This is the question "if the compiler only ever sees the `.i` file, how does it
report errors against `hello.c` line 5?"

### a. What we set up / save in a file

Look at the top of any `.i` file. Mixed in with the code are lines like:

```
# 1 "hello.c"
# 1 "<built-in>" 1
# 1 "hello.c" 2
# 1 "/usr/include/stdio.h" 1 3 4
```

These are **line markers** (the preprocessor writes them into the `.i`). Format:

```
# <line-number> "<file-name>" <flags>
```

A marker means: *"the text that follows is line `<line-number>` of
`<file-name>`."* The compiler reads each marker and resets its internal
line counter and current-file name. That is the entire mechanism that maps the
giant `.i` back onto your small `.c`.

The flags (optional) are hints:

| flag | meaning                                         |
|------|-------------------------------------------------|
| `1`  | we just **entered** a new file (an `#include`)  |
| `2`  | we just **returned** to a file (include ended)  |
| `3`  | text is from a **system header** (mutes warnings) |
| `4`  | treat as implicit `extern "C"`                  |

### b. Task

1. Put a deliberate bug in `hello.c` — delete the semicolon after the `printf`
   call. Compile it and note the reported location:
   ```
   clang -c hello.c
   ```
2. Now preprocess *first*, then compile the `.i`, and see where it claims the
   error is:
   ```
   clang -E hello.c -o hello.i
   grep -n "printf" hello.i        # note the PHYSICAL line in hello.i
   clang -c hello.i
   ```
3. Find the last `# N "hello.c" 2` marker in `hello.i` (the one just before
   `main`). Edit it by hand — change it to `# 100 "WRONG.c"`. Recompile the
   edited `.i` and read the error location.

### c. Observation (what you should find)

- In step 1 the error is reported at, e.g., `hello.c:5:...`.
- In step 2 the `printf` call physically lives on line ~831 of `hello.i`, yet the
  error message **still says `hello.c:5`** — not line 831. The compiler used the
  line markers to translate the position back.
- In step 3, after you lie in the marker, the compiler *believes you*: the error
  now reads something like `WRONG.c:103:...`. Count the physical lines from your
  faked `# 100 "WRONG.c"` marker down to the bug and you'll see the number lines
  up exactly. The compiler trusts the marker completely.

**Takeaway to say out loud:** the preprocessor plants signposts
(`# line "file"`) all through the `.i`, each one announcing "you are here." Error
line numbers are not magic — they are the compiler reading the nearest signpost.

---

# Concept 3 — The `.bc` file: when it appears and what's in it

### a. What we set up / save in a file

Dump every intermediate at once and list what you got:

```
clang --save-temps -c square.c
ls -1 square.*
```

You will see `square.i`, `square.bc`, `square.s`, `square.o`. The `.bc` sits
**after `.i` and before `.s`** in the chain — exactly the "IR" box in the
pipeline map. `.bc` stands for **bitcode**: the *binary* serialized form of LLVM
IR. It is the same information as the `.ll` text file in Concept 4, just packed
into bytes for tools to read quickly.

Example file:

```c
/* square.c */
int square(int n) { return n * n; }
```

### b. Task

1. Run `--save-temps` on `square.c` and on `hello.c`. List the products of each
   and place them in pipeline order yourself.
2. Confirm `.bc` is binary, not text:
   ```
   file square.bc
   od -A d -t x1 square.bc | head -1
   ```
3. Turn the binary bitcode back into readable text to prove they are the same
   thing (the tool may be named `llvm-dis` or `llvm-dis-18`):
   ```
   llvm-dis square.bc -o square_from_bc.ll
   cat square_from_bc.ll
   ```

### c. Observation (what you should find)

- `--save-temps` produces `.i .bc .s .o` — the `.bc` confirms IR really is a
  stage clang passes through, between preprocessed source and assembly.
- `file` reports `LLVM IR bitcode`, and the first bytes are
  `42 43 c0 de` — ASCII `B`, `C`, then `0xC0 0xDE`. That four-byte "magic number"
  (`BC\xC0\xDE`) is how tools recognize a bitcode file. You cannot read it in a
  text editor.
- `llvm-dis` turns `square.bc` back into perfectly readable IR — identical in
  content to what you'll see in Concept 4. So `.bc` is not a *different* thing
  from IR; it is IR written in binary instead of text.

**Takeaway to say out loud:** `.bc` is generated right after preprocessing,
before assembly. It contains LLVM IR in binary form — the compiler's internal
representation of your program, frozen to disk.

---

# Concept 4 — IR code: when it's generated and how to read it

### a. What we set up / save in a file

IR (LLVM Intermediate Representation) is generated by the clang **front-end**,
straight after it parses the preprocessed `.i`. You can ask clang to stop and
hand it to you in either form:

```
clang -emit-llvm -S square.c -o square.ll     # .ll = TEXT IR (human-readable)
clang -emit-llvm -c square.c -o square.bc      # .bc = BINARY IR (bitcode)
```

`-emit-llvm` means "produce LLVM IR instead of native assembly." Pair it with
`-S` for text, `-c` for binary. `.ll` and `.bc` are the same content in two
encodings (Concept 3 already showed you can convert between them).

### b. Task

1. Generate `square.ll` and read it. Identify: the function signature, where the
   argument is stored, where the multiply happens, where it returns.
2. Generate IR for `hello.c` too and skim it — notice the `call` to `printf` and
   the string constant.
3. Watch the optimizer rewrite the IR. Generate it once unoptimized and once
   optimized, then compare:
   ```
   clang -O0 -emit-llvm -S square.c -o sq_O0.ll
   clang -O2 -emit-llvm -S square.c -o sq_O2.ll
   diff sq_O0.ll sq_O2.ll
   ```
4. Confirm IR really does sit *before* assembly: generate `square.s`
   (`clang -S square.c`) and eyeball that the `.s` is plainly a translation of
   the IR you just read, not of the C directly.

### c. Observation (what you should find)

- The `-O0` IR for `square` is wordy and literal — it allocates a stack slot,
  *stores* the argument, *loads* it back **twice**, multiplies, returns. It
  mirrors the naïve meaning of the C with nothing cleaned up:
  ```
  %2 = alloca i32
  store i32 %0, ptr %2
  %3 = load i32, ptr %2
  %4 = load i32, ptr %2
  %5 = mul nsw i32 %3, %4
  ret i32 %5
  ```
- The `-O2` IR collapses to the essence — no stack traffic at all:
  ```
  %2 = mul nsw i32 %0, %0
  ret i32 %2
  ```
  The `diff` makes the optimizer's work visible: it proved the loads/stores were
  pointless and deleted them.
- The IR is clearly *between* C and assembly: it still has named, typed values
  (`i32`) and a `mul` instruction (more abstract than machine code), but it is
  already in straight-line, one-operation-per-line form (lower-level than C).
- Reading `square.s` afterwards, the assembly is recognizably a translation of
  the IR — confirming the real path is **C → IR → assembly**, never C → assembly.

**Takeaway to say out loud:** IR is the compiler's own language, produced right
after parsing. `.ll` is its text form, `.bc` its binary form. Everything the
optimizer does, it does to the IR — which is why reading IR is the clearest
window into *what the compiler decided to do with your code.*

---

## One-page command reference

| Goal                                  | Command                                  |
|---------------------------------------|------------------------------------------|
| Preprocessed source only (`.i`)       | `clang -E file.c -o file.i`              |
| Preprocessed, no line markers         | `clang -E -P file.c`                     |
| All intermediates (`.i .bc .s .o`)    | `clang --save-temps -c file.c`           |
| Text IR (`.ll`)                       | `clang -emit-llvm -S file.c -o file.ll`  |
| Binary IR / bitcode (`.bc`)           | `clang -emit-llvm -c file.c -o file.bc`  |
| Bitcode → readable text               | `llvm-dis file.bc -o file.ll`            |
| Native assembly (`.s`)                | `clang -S file.c`                        |
| Compare optimizer effect on IR        | `clang -O0/-O2 -emit-llvm -S file.c`     |

**Order to remember:** `.c → .i → IR (.ll/.bc) → .s → .o → executable`.

---

## New Words (కొత్త పదాలు — తెలుగు అర్థాలు)

| English word | తెలుగు అర్థం |
|--------------|--------------|
| **signpost** | మార్గసూచిక / దారిచూపే బోర్డు — "మీరు ఇక్కడ ఉన్నారు" అని చూపే బోర్డు. ఇక్కడ line marker లను దీనితో పోల్చాం. |
| **preprocessor** | ముందస్తు ప్రాసెసర్ — కంపైలర్ నడవడానికి *ముందు* నడిచే దశ. ఇది C భాష అర్థం చేసుకోదు, కేవలం పాఠ్యాన్ని (text) మాత్రమే మారుస్తుంది. |
| **compiler** | కంపైలర్ (సంకలని) — మనం రాసిన C ప్రోగ్రామ్‌ను యంత్ర భాషలోకి అనువదించే సాధనం. |
| **driver** | డ్రైవర్ — అనేక చిన్న సాధనాలను వరుసగా నడిపించే ప్రధాన కార్యక్రమం (clang ఒక డ్రైవర్). |
| **intermediate file** | మధ్యంతర ఫైల్ — తుది ఫలితానికి ముందు, ప్రతి దశలో తయారయ్యే మధ్యలోని ఫైల్. |
| **preprocessed source** (`.i`) | ముందస్తుగా ప్రాసెస్ చేయబడిన కోడ్ — అన్ని `#include`లు చేర్చబడిన తర్వాత మిగిలే పాఠ్య రూపంలోని C కోడ్. |
| **header file** | హెడర్ ఫైల్ — ప్రకటనలు (declarations) ఉండే ఫైల్; `#include` ద్వారా చేర్చబడుతుంది. |
| **declaration** | ప్రకటన — ఒక ఫంక్షన్ లేదా చరరాశి ఉనికిని తెలిపే వాక్యం. |
| **text insertion** | పాఠ్య చొప్పింపు — ఒక ఫైల్ యొక్క పాఠ్యాన్ని మరో ఫైల్‌లో నేరుగా కాపీ-పేస్ట్ చేయడం. |
| **line marker** | పంక్తి గుర్తు — `.i` ఫైల్‌లో `# 5 "hello.c"` లాంటి గుర్తు; "ఈ క్రింది పాఠ్యం hello.c లోని 5వ పంక్తి" అని చెబుతుంది. |
| **flag** | సూచిక / ఫ్లాగ్ — అదనపు సమాచారం ఇచ్చే చిన్న గుర్తు (1, 2, 3, 4). |
| **system header** | సిస్టమ్ హెడర్ — ఆపరేటింగ్ సిస్టమ్/లైబ్రరీతో పాటు వచ్చే సిద్ధ హెడర్ ఫైళ్ళు (ఉదా: `stdio.h`). |
| **IR / Intermediate Representation** | మధ్యంతర ప్రాతినిధ్యం — C కి, యంత్ర భాషకి మధ్యలో ఉండే LLVM యొక్క సొంత భాష. |
| **bitcode** (`.bc`) | బిట్‌కోడ్ — IR యొక్క ద్విआధార (binary) రూపం; మనుషులు చదవలేరు, సాధనాలు మాత్రమే చదవగలవు. |
| **binary** | ద్విआధార (బైనరీ) — 0లు, 1లతో కూడిన, మనుషులు నేరుగా చదవలేని రూపం. |
| **magic number** | మ్యాజిక్ నంబర్ — ఫైల్ రకాన్ని గుర్తించడానికి ఫైల్ మొదట్లో ఉండే ప్రత్యేక బైట్లు (`BC\xC0\xDE`). |
| **assembly** | అసెంబ్లీ — ఒక నిర్దిష్ట CPU కోసం తయారైన తక్కువ-స్థాయి (low-level) భాష. |
| **assembler** | అసెంబ్లర్ — అసెంబ్లీని యంత్ర కోడ్ (`.o`)గా మార్చే సాధనం. |
| **linker** | లింకర్ — అనేక `.o` ఫైళ్ళను, లైబ్రరీలను కలిపి ఒక executable తయారుచేసే సాధనం. |
| **executable** | నిర్వహించదగిన ఫైల్ — నేరుగా నడిపించగల తుది ప్రోగ్రామ్ (ఉదా: `a.out`). |
| **optimizer / optimization** | మెరుగుపరచడం — ఫలితం మారకుండా కోడ్‌ను వేగంగా / చిన్నగా చేసే దశ. |
| **stack slot** | స్టాక్ స్థానం — చరరాశిని తాత్కాలికంగా దాచడానికి మెమొరీలో కేటాయించిన చోటు. |
| **argument** | ఆర్గ్యుమెంట్ (పరామితి) — ఫంక్షన్‌కు పంపే విలువ. |
| **function signature** | ఫంక్షన్ సంతకం — ఫంక్షన్ పేరు, దాని పరామితుల రకాలు, తిరిగిచ్చే రకం. |
| **native** | స్థానిక — ఆ నిర్దిష్ట CPU/యంత్రానికి సొంతమైన (ఉదా: native assembly). |
