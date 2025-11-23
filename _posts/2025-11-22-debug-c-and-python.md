---
layout: post
title: "Debug C and Python"
date: 2025-11-22 06:20
comments: false
categories:
draft: false
---

| **Action**                    | **LLDB (C program: `sum`)** | **PDB (Python script: `sum.py`)** |
| ----------------------------- | --------------------------- | --------------------------------- |
| **Start debugger**            | `lldb sum`                  | `python3 -m pdb sum.py`           |
| **Run program**               | `run` / `r`                 | `run`                             |
| **Continue after break**      | `continue` / `c`            | `continue` / `c`                  |
| **Step over line**            | `next` / `n`                | `next` / `n`                      |
| **Step into function**        | `step` / `s`                | `step` / `s`                      |
| **Step out of function**      | `finish`                    | `return`                          |
| **Set breakpoint (line)**     | `b sum.c:12`                | `b 12`                            |
| **Set breakpoint (function)** | `b main`                    | `b myfunc`                        |
| **Conditional breakpoint**    | `b sum.c:12 -c 'x > 5'`     | `b 12, x>5`                       |
| **List breakpoints**          | `br list`                   | `b`                               |
| **Delete breakpoint**         | `br del 1`                  | `cl 1`                            |
| **Show current source**       | `list` / `l`                | `l` / `ll`                        |
| **Print variable**            | `p x`                       | `p x`                             |
| **Pretty print**              | `po x`                      | `pp x`                            |
| **Show local variables**      | `frame variable`            | `locals()`                        |
| **Show function args**        | `frame variable`            | `args`                            |
| **Backtrace / stack**         | `bt`                        | `where` / `w`                     |
| **Move up stack frame**       | `up`                        | `up`                              |
| **Move down stack frame**     | `down`                      | `down`                            |
| **Modify variable**           | `expr x = 10`               | `x = 10`                          |
| **Watch variable**            | `watch x`                   | `display x`                       |
| **Remove watch**              | `watch del 1`               | `undisplay 1`                     |
| **Disassemble**               | `disassemble`               | `import dis; dis.dis(func)`       |
| **Evaluate expression**       | `expr 2+2`                  | `p 2+2`                           |
| **Run until line**            | `thread until 40`           | `until 40`                        |
| **Quit debugger**             | `quit` / `q`                | `quit` / `q`                      |



| Action                 | LLDB (C program: `sum`)              | PDB (Python script: `sum.py`)          |
|------------------------|--------------------------------------|----------------------------------------|
| Start debugger         | `lldb sum`                           | `python3 -m pdb sum.py`                |
| Run program            | `run` / `r`                          | `run`                                  |
| Continue after break   | `continue` / `c`                     | `continue` / `c`                       |
| Step over line         | `next` / `n`                         | `next` / `n`                           |
| Step into function     | `step` / `s`                         | `step` / `s`                           |
| Step out of function   | `finish`                             | `return`                               |
| Set breakpoint (line)  | `b sum.c:12`                         | `b 12`                                 |
| Set breakpoint (func)  | `b main`                             | `b myfunc`                             |
| Conditional breakpoint | `b sum.c:12 -c 'x > 5'`              | `b 12, x>5`                            |
| List breakpoints       | `br list`                            | `b`                                    |
| Delete breakpoint      | `br del 1`                           | `cl 1`                                 |
| Show current source    | `list` / `l`                         | `l` / `ll`                             |
| Print variable         | `p x`                                | `p x`                                  |
| Pretty print           | `po x`                               | `pp x`                                 |
| Show local variables   | `frame variable`                     | `locals()`                             |
| Show function args     | `frame variable`                     | `args`                                 |
| Backtrace / stack      | `bt`                                 | `where` / `w`                          |
| Move up stack frame    | `up`                                 | `up`                                   |
| Move down stack frame  | `down`                               | `down`                                 |
| Modify variable        | `expr x = 10`                        | `x = 10`                               |
| Watch variable         | `watch x`                            | `display x`                            |
| Remove watch           | `watch del 1`                        | `undisplay 1`                          |
| Disassemble            | `disassemble`                        | `import dis; dis.dis(func)`            |
| Evaluate expression    | `expr 2+2`                           | `p 2+2`                                |
| Run until line         | `thread until 40`                    | `until 40`                             |
| Quit debugger          | `quit` / `q`                         | `quit` / `q`                           |

