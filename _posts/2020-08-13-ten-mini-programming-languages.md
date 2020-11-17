---
layout: post
title: "Ten Mini-Languages"
date: 2020-08-13 08:30
comments: false
categories:
draft: false
---

Ten Mini-Languages:
A Study of Topical Issues in Programming Languages

HENRY F. LEDGARD

Computer Science, The Johns Hopkins University, Baltimore, Maryland

```
CONTENTS

General Considerations

Mini-Language 1 : Simple Assignment,
                  Transfer of Control,
                  and Block Structure
Description of Language Elements
Piogram Execution
Discussion

Mini-Language 2: Generalized Assignment and
                 the Notion of Locations
Description of Language Elements
Program Execution
Discussion

Mini-Language 3: Generalized Transfer of Control

Mini-Language 4: Functions

Mini-Language 5: Passing of Parameters

Mini-Language 6: Static Type Checking

Mini-Language 7: Dynamic Type Checking

Mini-Language 8: Structured Data

Mini-Language 9: String Manipulation

Mini-Language 10: Input/Output

Acknowledgments
References
```

The proliferation of programming languages has raised many issues of language design, definition, and implementation. This paper presents a series of ten mini-languages, each of which exposes salient features found in existing programming languages. The value of the mini-languages lies in their brevity of description and the isolation of important linguistic features: in particular, the notions of assignment, transfer of control, functions, parameter passing, type checking, data structures, string manipulation, and input/output. The mini-languages may serve a variety of uses: notably, as a pedagogical tool for teaching programming languages, as a subject of study for the design of programming languages, and as a set of test eases for methods of language implementation or formal definition.

Key words and phrases: curriculum for computer science, language design, compiler design, formal definition, syntax, semantics, assignment, transfer of control, functions, passing of parameters, type checking, string manipulation, data structures, input/output

GENERAL CONSIDERATIONS

Since the birth of FORTRAN, the notion of higher-level programming languages has led to a proliferation of special-and general-purpose programming languages. It seems wise, at this juncture, to examine critical issues raised by the myriad of languages and to try to isolate certain important features that seem common to many programming languages. In this endeavor, we have prepared ten mini-languages, each presenting in capsule form one or two features taken from existing programming languages. (The reader may find the work of Strachey [16] useful as a companion to this paper, as he considers many issues related to those pre- sented here.)
The issues treated in this paper are summarized in Table I. Each mini-language is a complete (although restricted language in itself, and each is described only informally. A modest appeal is made to the reader's knowledge of constructs in existing programming languages. None of the mini-languages are exact subsets of existing languages, although much of the notation and semantic material resembles portions of existing languages. Many important features of existing languages are omitted. These features include parallel computation, interrupts and events in real-time, file and storage management, and simulation. The format for presenting each minilanguage is as follows:

1. a brief introduction to some topic in
   programming languages;
2. a description in English of a mini-
   language covering the topic;
3. several example programs in the mini-
   language; and
4. a discussion of the mini-language and its relation to issues in current programming languages.
   There appear to be at least four major areas in which the mini-languages might prove useful:

5. as a pedagogical tool for teaching pro-
   gramming languages;
6. as a subject of study for language de-
   sign;
7. as a set of test cases for proposed meth-
   ods of language implementation; and
8. as a set of test cases for proposed methods of formal definition. In teaching programming languages, one immediate problem is that most languages are so complex that any attempt to isolate their important features requires a good deal of study. There is clearly a need for small, digestible examples to illuminate critical issues and make them a simple ob- ject of study. The ten mini-languages are part of an effort to meet this need. The is- sues treated in the mini-languages are common to many programming languages, e.g., PL/I, ALGOL 60, BASIC, CPL, PAL, FOR- TRAN, MAD, LISP, SNOBOL, AXLE, GEDANKEN, and ISWlM.

```
Commands:
   Simple assignment, transfer of control, and block structure
   Generalized assignment and the notion of locations
   Generalized transfer of control

Procedures:
   Functions
   Passing of parameters

Type checking:
   Static type checking
   Dynamic type checking

Applications:
   Structured data
   String manipulation
   Input/output
```

There are few accepted principles con- tributing to a viable theory of language de- sign, despite the large number of program- ming languages. This is indeed unfortunate, as the art of using a computer effectively hinges critically on our use of languages that a computer understands. Each mini-language presented here was motivated by three basic design criteria: illumination of some im- portant aspect of current programming languages, brevity of description, and a clear distinction between syntax and semantics. These criteria are vague and incomplete. Furthermore, issues like type checking, string manipulation, structures, and input/ output deserve special study. It is hoped that the mini-languages may serve as a basis for study of several important issues in language design. The mini-languages illuminate several difficulties of language implementation. For example, the mini-language on generalized transfer of control poses the difficult issue of linking identifiers with proper values; the two mini-languages on type checking pose the problem of recognition of conditions that lead to program errors; and the mini-language on string manipulation raises the question of efficiency in the algorithmic recognition of strings defined by a generative grammar. Thus the mini-languages could be the basis for a course on compiler design or on proposed methods of language implementation.

The mini-languages also raise important issues in the area of formal definition of programming languages. Few methods of formal definition have been applied to gen- eralized transfer of control, string manipula- tion, and input/output. By limiting the variety of syntactic and semantic content in each mini-language, it is hoped that we can better focus on the acceptability of pro- posed strategies for dealing with the issues encapsulated in the mini-languages. There are many criteria for judging the accepta- bility of a particular defining mechanism. Certainly among these are conciseness of definition, perspicuity of definition, the amount of information needed to understand the defining mechanism, and the ability of the defining mechanism to adapt itself to different linguistic constructs. It seems likely that an attempt to define all ten mini- languages by any one of the existing meth- ods of formal definition will fail to satisfy the above criteria, and that perhaps a wed- ding of several methods is a logical (and fruit- ful) next step toward achieving a satisfac- tory method of formal definition. In an effort to keep the descriptions of the mini-languages minimal, the following defini- tions, unless otherwise stated or unused, hold for all mini-langnages: Primitive objects are the natural numbers, represented by the numerals 0 1 2..-. Identifiers comprise the symbols A B. • • Z. Labels comprise the symbols L1 L2.... Lists consist of an item or a series of two or more items each separated by a comma. For example, 1, 6, 51, 9 is a list of numer- als. Sequences are defined as an item or a series of two or more items each on a new line. For example,

```

A:=I
B:=
C:=B

```

is a sequence of assignment commands. In addition, a clear distinction is made be- tween programs that are erroneous because of their syntactic form and programs that are erroneous because they lead to an unde- fined condition during execution. In particu- lar, certain context-sensitive requirements (for example, that each identifier in a pro- gram must be declared) are imposed on the syntax of several of the mini-languages. A program not satisfying all requirements of its syntax is said to be "syntactically illegal" and must not be executed. Furthermore, the rules for execution of a program may lead to a condition that is undefined according to these rules. Such a program is said to be "in violation," and execution must termi- nate at the point of violation. The following condition holds for all mini-languages: Any attempt to evaluate an identifier or named ex- pression whose value is undefined is in viola- tion.

Aside from the above conventions, the de- scription of each mini-language is self-con- tained, and the reader who wishes to study one or more of the mini-languages separately may do so.

MINI-LANGUAGE 1:
SIMPLE ASSIGNMENT, TRANSFER OF CONTROL, AND BLOCK STRUCTURE

Probably, the most common feature of exist- ing programming languages is the descrip- tion of computations by a sequence of com- mands. Each command indicates some series of operations, appropriate to the language, that is to be performed on data. The data objects may be represented directly (e.g., the natural numbers are represented here by the numerals 0, 1, 2, etc.), or there may ap- pear identifiers that, when evaluated in cer- tain contexts, have values that are data ob- jects. The commands are generally exeeuted sequentially, unless a command is executed that explicitly alters the sequential order. However, two questions arise. First, what objects are assoeiated with the identifiers used in the exeeution of a command? See- ondly, after the execution of a eommand, which command is to be executed next? Such questions are especially basle to lan- guages that include assignment, transfer of control, and block structure. Mini-language 1 treats these issues in somewhat simplified form. Mini-languages 2 and 3 treat more generalized notions of assignment and trans- fer of control.

Description of Language Elements
Commands in mini-language 1 are of three
varieties:

1. a simple assignment command, which
   consists of a string of the form i := e,
   where i is an identifier, and e is a numeral
   or an identifier;
2. a hopto command, which consists of a
   string of the form hopto l, where 1 is a
   label; and
3. a block (defined below).
   A command may be prefixed by a label.
   A declaration consists of a string of the
   form iden l, where l is a list of identifiers,
   each of which must be different.

A block consists of a string of the form begin d c end, where d is a declaration, and c is a sequence of commands such that: 1) each label prefixing a command in c must be different; and 2) each label in a hopto com- mand in c must be identical to some label prefixing a command in c. An identifier given in a declaration is said to have a "scope," which consists of the block in which the identifier is declared and all encompassed blocks that do not contain another declaration of the same identifier. (Note that a label prefixing a command in c may be said to have a "scope" similar to that of an identifier. Because of requirement (2) above, it is not necessary in mini-language 1 to extend the concept of the scope of a label to more deeply nested blocks. This issue will be treated in mini-langnage 3.)

Program Execution
Each identifier declared in a program refers to an (initially unspecified) object. The execution of a program begins with the execution of the outermost block and proceeds according to the following rules:

1. Each command in a block is sequentially executed until a hopto command (defined below) is encountered.
2. The execution of a simple assignment command of the form i := e proceeds as follows: a) the expression e is evaluated, and if e is an identifier, its value is the object currently assigned to the identical, de- clared identifier whose scope includes the assignment command; b) the object obtained in (a) is assigned as the value of the identifier i whose scope includes the assignment com- mand.
3. The execution of a hopto command of the form hopto l causes execution to continue (sequentially) from the com- mand that is prefixed by the label and that occurs in the same block (not a more deeply nested block) as the hopto command. The execution of a program terminates when the execution of the outermost block is terminated (unless, as mentioned earlier, a violation condition arises from an attempt

to evaluate an identifier whose value is unspecified).

```

EXAMPLE i :
begin iden A, B
A:=i
B:=
begin iden B, C
B:=A
C:=
end
A:=
B:=
end

```

```

EXAMPLE 2:
begin iden A, B
A:=i
B:=
begin iden B, C
B:=A
C:=
end
hopto L
A:=
L1B:=
end

```

```

EXAMPLE 3
(Syntactically illegal) :
begin iden A, B
A:=I
B:=
begin iden B, C
B:=A
D:=
end
L1A:=
L1C:=
end

```

In Examples 1 and 2, there are four de-
clared identifiers: A and B in the outer
block, and B and C in the inner block. Let
us refer to these four identifiers as A~, B~,
B2, and C2. In Example 1 the final values of
A1, Bj, B2, and C2 will be 3, 3, 1, and 7;
whereas in Example 2 the final values will
be 1, 3, 1, and 7. The program of Example 3
is syntactically quite illegal, notably in that
identifier D is not declared, the label L1 pre-
fixes two commands in a single block, and
identifier C in the last command is not de-
clared for the block in which it occurs.

Discussion
The notions of assignment and transfer of
control are characteristics of almost all pro-
gramming languages. In this respect, pro-
gramming languages make a serious de-
parture from conventional mathematics,
where the imperative mood of commands is
not used. The use of these imperatives prob-
ably arose from the fact that, in their sim-
plest forms, assignment and transfer of con-
t rol are very close to equivalent commands in
machine languages. From the user's point of
view, machine-oriented notions like sequenc-
ing, creation of dummy variables, and stor-
age allocation are often extraneous to his
objective.
It is probably fair to say that future de-
velopments in programming languages will be
less algorithmic (i.e., less machine-oriented)
and more synthetic (i.e., more goal-oriented).
For example, the notion of block structure
frees the user from concern about the way in
which the storage of variables is allocated
and their current values obtained. Other
language developments (e.g., default declara-
tions, the pattern matching rule of S~-OBOL,
and reeursive definitions) also free the user
from unnecessary details, such as explicit
specification of types, string scanning algo-
rithms, and pushdown stacks.

MINI-LANGUAGE 2:
GENERALIZED ASSIGNMENT AND
THE NOTION OF LOCATIONS

Consider the following two assignment com-
mands:

1. (ifA>B then X else Y) := I
2. I := (if A>B then X else Y)
   The two expressions "(if A>B then X else
   Y)" and "I" are evaluated quite differently
   in commands (1) and (2). Loosely speaking,
   in command (2) we want to know what ob-
   ject is currently associated with one of the
   identifiers, X or Y; whereas in command (1)
   we want to know what location is currently
   reserved for one of the identifiers, X or Y,
   so that we can update its contents. The dif-

ference here is one of context: an expression
is evaluated differently according to its posi-
tion on the right or left side of an assign-
ment command. Mini-language 2 is directed
toward illuminating this difference in evalu-
ating the left- and right-hand sides of an
assignment statement in that both the value
and location of a named object must be
evaluated dynamically.
Rather than considering cases such as
those illustrated by commands (1) and (2)
above, we will consider the somewhat sim-
pler notion of assignment commands with
"indirect addressing." The notion of indirect
addressing forces a different dynamic evalu-
ation of the expressions on the right and left
sides of an assignment command.

Description of Language Elements
The primitive objects in mini-language 2
are the literals 'A', 'B',. •., 'Z'.
A left-hand expression is either an identi-
fier or a leR-hand expression prefixed by the
symbol " J~ "
A right-hand expression is either a literal,
an identifier, or a right-hand expression pre-
fixed by the symbol " \$ "
An assignment command is a string of the
form x := y, where x is a left-hand expres-
sion and y a right-hand expression. An
assignment command is executed by per-
forming the steps described below as follows:
steps (1) and (2), in either order, then step
(3).

1. "Right-mode" evaluation of y: a) if y is
   a literal, its value is the literal itself; b) if
   y is an identifier i, its value is the literal
   currently stored in the location for i; and
   c) if y is a right-hand expression e pre-
   fixed by ~L, its value is the literal T cur-
   rently stored in the location of the iden-
   tifier i, where the literal 'i' is the right-
   mode value of e.
2. "Left-mode" evaluation of x: a) if x is an
   identifier i, its value is the location in
   which the object associated ~th i is
   stored; and b) if x is a left-hand expres-
   sion e prefixed by \$, its value is the
   location of the identifier i, where 'i' is the
   right-mode value of e.
3. The literal obtained in (1) is copied into
   the location obtained in (2).

Program Execution
A program consists of a sequence of as-
signment commands, each to be executed
sequentially.

```

EXAMPLE 1 : EXAMPLE 2
X : = 'A' (in violation) :
Y := 'X' X := 'A'
Z:= Y Y:= SX
SZ := 'B'

```

In Example 1, there are three identifiers:
X, Y, and Z. At the end of the execution of
the program the literals associated with X,
Y, and Z will be 'B', 'X', and 'X'. Example 2
is in violation upon execution of the second
assignment command because the evaluation
of J, X results in an attempt to obtain a
literal from the location of A, which does not
have a specified value.

Discussion
The intent of mini-language 2 is to ex-
plicate the notion of locations, which is often
obscured in programming languages. The
simple fact is that when we use a name, say
"A", in a piece of programming language
text, we sometimes mean the object or value
associated with A and sometimes the loca-
tion associated with A. For example, con-
sider the following PL/I program:

```

EXi: PROC OPTIONS (MAIN);
P: PROC (B); DCL B FIXED;
B = B+2;
END P;
DCL A FIXED;
A=I;
A=A+I;
P (A) ;
END;

```

Here "A" is used with two distinct meanings.
In the expression A+i, "A" really means
some value. Once we are given the value of
A, we can perform the required addition,
without concern about the name of A or the
location of the value of A. In the statement
A=i, "A" really denotes some location.
Once we are given this location, we can pro-
ceed with the assignment, without concern
about the name A or its value. In the pro-
cedure invocation P(A), "A" really means its

location, for, upon invocation, the formal
parameter B of procedure P is linked with
the location of A. Hence the occurrence of B
on the left side of "B = B+2;" refers to the
location of A (which is to be updated),
whereas the occurrence of B on the right
side denotes the value stored in the location
of A.
Most programming languages place re-
strictions on the kinds of expressions that
can denote locations. For example, the com-
mands

```

(if A>B then X else Y) := e
and
F(X) := e

```

where e is an expression, are usually pro-
hibited, although there is no conceptual difS-
culty in viewing Boolean expressions or func-
tional applications as being evaluated in
"left-mode," i.e., yielding a location.
Furthermore, one generally thinks of ar-
rays as functions from an n-tuple of integers
into values. But consider the assignment
command A[I] := A[I]+I, where A is an
array and I is an integer. Here A[I] on the
left side of the command really denotes a
location, and the occurrence of All] on the
right side denotes the value stored in this
location. Therefore, we should, perhaps,
consider arrays as functions from n-tuples of
integers into locations. With this view, the
assignment command is readily explained
by considering its left side as evaluated in
left-mode and its right side in right-mode.
In summary, it appears that we should
face the notion of locations in programming
languages with proper concern for a dis-
tinction between locations and the values
stored therein.

MINI-LANGUAGE 3:
GENERALIZED TRANSFER OF CONTROL

The notion of transfer of control is a topic
that often stimulates controversy, especially
in languages that permit label variables or
label arguments of procedures. Mini-lan-
guage 3 treats this issue by augmenting mini-
language 1 to include the notions of a label

Ten Mini-Languages • 121

variable and of transfer of control between
blocks.

Description of Language Elements
Commands in mini-language 3 are of three
varieties:

1. an assignment command, which consists
   of a string of either the form i := e or
   i := l, where i is an identifier, e is a
   numeral or an identifier, and l is a label;
2. a goto command, which consists of a
   string of the form goto x, where x is an
   identifier or a label; and
3. a block (defined below).
   A command may be prefixed by a label.
   A declaration consists of a string of the
   form iden il, i2,"-, i,, where ii, i2,

- .-i~ are identifiers, each of which must be
  different.
  A block consists of a string of the form
  (1) begin d c end, where d is a declaration,
  and c is a sequence of commands such that
  each label prefixing a command in c must be
  different. An identifier given a declaration or
  a label prefixing a command is said to be
  "declared," and to have a "scope" consisting
  of block (1) above, in which the identifier or
  label is declared, and all encompassed blocks
  in c that do not contain another declaration
  of the same identifier or label.
  A program consists of a block such that
  each occurrence of an identifier or label in a
  command lies within the scope of an identi-
  cal, declared identifier or label identifier.
  The value of a label l in an assignment or
  goto command consists of two parts: 1) the
  (unique) command c that is prefixed by 1
  and lies within the scope of l; and 2) the
  "environment" for c; i.e., a pairing of the
  identifiers whose scope includes c with the
  locations in which their current values are
  stored.

Program Execution
Each identifier in a program refers to an
(initially unspecified) object. The execution
of a program begins with the execution of
the outermost block and proceeds according
to the following rules:

1. The execution of a block results in the
   allocation of new locations for identifiers
   that are local to the block, followed by

the sequential execution of each command
in the block until a goto command (de-
fined below) is encountered.

2. The execution of an assignment com-
   mand is the same as for mini-language 1,
   except that for a label assignment com-
   mand, such as i := l, the value of the
   label 1 is assigned to i.
3. The execution of a goto command of the
   form goto x is as follows: a) the value of
   x is obtained, and if it is not that of a
   label, the command is in violation; and
   b) execution continues (sequentially) at
   the command c given with the value of
   x, and the environment for execution is
   set to that given with the value of x.
   Note that the execution of a goto command
   may result in the transfer of execution to a
   block not encompassing the goto command
   (see Example 2).

```

EXAMPLE l :
begin iden A, B
A:=L
B:=
begin iden B, C
B:=
C:=
goto A
end
A:=
L1 A:=I
end

```

```

L
L
end

```

```

EXAMPLE 2 :
begin iden A, B
B:=
begin iden B, C
B:=
A:= L
goto L
L3 C:=
goto L
end
A:=
goto A
A:=i

```

In both Examples 1 and 2 there are four
names: A and B in the outer block, and B
and C in the inner block. Let us refer to the

four n~mes as At, ]31, B2, and C2. In both ex-
amples, the final values of A1, B1, B2, and C
will be 1, 2, 3, and 4. Note that in Example
2 the command "goto A" transfers execu-
tion from the outer block into the inner block.

Discussion
The essential question underlying gener-
alized transfer of control is: what environ-
ment is given for identifiers after a transfer
of control is made? There are many alterna-
tives. For example, a) at the point of execu-
tion of a label assignment, a snapshot is
made of the current environment and of the
values stored in the locations for identifiers,
and this snapshot may be used when a goto
command is executed; b) the most recent
environment for each block encompassing
the command to which control is transferred
may be used; or e) the environment given at
the point of the label assignment may be
used.
Consider a modified version of a program
offered by Daniel Berry (by private com-
munication) :

```

begin iden A, X, Y
A:=i
L1 begin iden B
B:=I
if A = 2 then
beginB:=B+
Y:=L
goto X
end
X:=L
L2B:=B+I
print B
end
ifA = 1 thenA := 2elseexit
goto L
end

```

What value is printed after "print B" is
executed the second time? The three inter-
pretations (a) through (e), given above,
yield the following results:

1. The numeral 2 is printed. The snapshot
   taken after the assignment "X := L2"
   would link B with the value 1, and trans-
   fer of control to L2 would update the
   value of B to 2, which would be printed.

2) The numeral 5 is printed. The com-
   mand "goto X" would behave as if it
   were written as "goto L2"
3) The numeral 3 is printed. After exit from
   the inner block the first time, the en-
   vironment for L2 would link B with tile
   value 2. The command "goto X" would
   reset the environment for the inner block
   so that the value of B would be 2, and
   transfer of control would subsequently
   update the value of B to 3, which would
   be printed.
   As mentioned earlier, the notion of trans-
   fer of control is a difficult and debatable
   issue. Readers wishing a more detailed dis-
   cussion of this subject are referred to the
   illuminating paper by Johnston [6].
   Other issues regarding transfer of control
   are also worth pointing out. Does transfer of
   control make program debugging much more
   difficult? Should transfer of control out of
   procedures or into more deeply nested blocks
   be allowed? What does "goto x," where x
   is a label variable, mean when the command
   is executed during recursive procedure calls?
   How difficult is it to implement or formally
   define a generalized transfer of control
   facility? In short, is the notion of transfer
   of control a useful feature of programming
   languages?
   One of the causes for the debate over
   transfer of control is that we lose the prop-
   erty of referential transparency [13]; that
   is, we can no longer isolate an arbitrary
   portion of a program and conceptually re-
   place it by its value. For example, consider
   a procedure declaration of the form

```

declare procedure P(X, Y);
0;c2;''' ;Cn;
end

```

where Cl, c2, • • •, cn are commands whose
effects are local to the procedure body. The
"value" of such a procedure might be the
function for computing tile greatest com-
mon divisor of X and Y or a store to store
transformation, swapping the values of X
and Y. If we add the possibility that one of
the commands cl, c2, • • •, c~ may result in
a transfer of control out of the procedure
body, then we can no longer isolate its

Ten Mini-Languages • 123

"value," as we may leave the procedure and
its supposed point of return.
More generally, the use of transfer of con-
trol makes the art of programming more
sequence-oriented and less goal-oriented.
Furthermore, as in mini-language 3, there
are other side-effects associated with a gen-
eralized transfer of control facility: namely,
the notions of which variables are activated
and to which values they are to be linked.
These problems indicate that the notion of
transfer of control should be studied with a
careful eye toward making its definition and
implementation simpler.

MINI-LANGUAGE 4: FUNCTIONS

One of the most useful features of many
programming languages is the ability to
define and apply functions. Mini-language 4
is devoted exclusively to the notion of a
function and is devoid of command features.
This mini-language treats functions as first-
class mathematical objects; in particular,
the value of an identifier or an expression can
be a function, and functions whose domain
and range may include other functions can
be defined. Mini-language 4 is based on tile
applicative expressions of Peter Landin [8],
which, in turn, are based on the X-calculus
of Church [1] and Curry [3], and on the
mathematical notion of a function.

Description of Language Elements
Primitive objects in mini-language 4 in-
clude, in addition to the natural numbers:

1. a binary function, which maps two nat-
   ural numbers into the natural number that
   is their numerical sum; and 2) a quarternary
   function, which maps four objects--of which
   the first two are natural numbers and the
   second two are arbitrary objects--into the
   third object if the first natural number is
   greater than the second and into the fourth
   objectif the opposite is true. These binary
   and quarternary functions are represented
   by the symbols "+" and "select," re-
   spectively.
   A simple expression is either one of the
   primitive symbols {+ select 0 1 2... } or
   an identifier. The value of a primitive symbol

is the primitive object represented by the
symbol. The value of an identifier is the
object currently linked with the identifier
(for linking of identifiers to objects, see
definition and evaluation of "let" expres-
sions, below).
A list expression is a list of expressions.
The value of a list expression ej, e2, "",
e., where the el (1 ~ i ~ n) are expressions,
is the list of objects at, a2, • • -, a~ obtained
by evaluating (in any order) each of the
component expressions ej, e2, • • •, en •
A combination is a string of the form r(l),
where r is an identifier or one of the primitive
symbols d- or select, and l is a list expres-
sion. The value of a combination is obtained
by evaluating r and l and then applying
the value of r to the value of l. This evalua-
tion is well-defined (i.e., not in violation)
only if: the value of r is a function; the
number of the components of list expression
l is identical to the number of arguments of
the function; and if r is one of the symbols d-
or select, the values of the first two argu-
ments of l must be natural numbers.
The following alternate notations may be
used for combinations:

in place of

```

(el + e2)

```

```

-4- (el, e2)
and
(if el > e2 then ea else e4)

```

in place of

```

select (el, e2, ca, e4).

```

A let expression is a string of either the
form

```

1. let i = el in e

```

or

2. let f(xt , ..., x~) = el in e

where i is an identifier, f, Xl, ".., x~ are
identifiers each of which must be different,
and el and e2 are expressions. The value of a
let expression of form (1) is computed by
evaluating el, linking i with the value of e~,
and then evaluating e2. The value of a let
expression of form (2) is computed by form-

```

ing the function mapping n arguments into
the value of the expression et obtained by
linking the identifiers xl, • •., x~ with their
respective arguments, and linking identifiers
other than Xl, ..., xn with their current
values; linking f with the function thus
formed; and then evaluating e2.
If the identifier f itself appears in el and
is not linked by another let expression that is
a subcxpression of el, then the occurrence of
f is taken as part of a recursive definition of
f. For example, the let expressions:

1. let Y = 3
2. let F(X) = (X + X)
3. let G(N) = (ifN > 3 then 1 else G(5))
   link Y, F, and G with objects whose effec-
   tive values are, respectively: 1) the natural
   number three; 2) the function mapping a
   natural number into its double; and 3) the
   function mapping a natural number into
   the constant value one.
   An expression is either a simple expression,
   a list expression, a let expression, or a com-
   bination.

```

```

Program Execution
A program is an expression. The value of a
program is the value of the expression. Note
that (as mentioned in the first section,
"General Considerations") if the evaluation
of a program leads to the evaluation of an
identifier that is not linked to a valuer-the
program is in violation.

```

```

EXAMPLE 1 :
let F(Y) = (Y+3)
in (F(1) d-F(2))

```

```

EXAMPLE 2:
let F(X) = (X+X)
in let G(P, X) = (P(X)+P(1))
in G(F, 2)

```

```

EXAMPLE 3:
let F(X) = (if X>3 then X
else (X+F (X+l))
in F(2)

```

```

EXAMPLE 4 :
let Y = 2
in let F(X) = (X+Y)
in F

```

```



```

```

EXAMPLE 5
let P(F, G, N) = (if N>100 then 1 else
G(F, G(N+I)))
in let Q(F, G, N) = (if N> 100 then i else
F(F, G(N+I)))
in P(P, Q, 86)

```

```

The values of the example programs above
are: Example 1, the natural number 9;
Example 2, the natural number 6; Example
3, the natural number 9; Example 4, the
function mapping some object X (presum-
ably a natural number) into a summation of
X and the natural number 2; and Example
5, the natural number 1.

```

```

Discussion
The notion of functions is a well-accepted
and useful feature of conventional mathe-
matics, and notions akin to functions (e.g.,
procedures and subroutines) have been duly
incorporated into most programming lan-
guages. However, one must be quite careful
when one tries to model such programming
language constructs like procedures and sub-
routines with functions. Consider the simple
ALGOL 60 procedure declaration:

```

```

integer procedure P(X); integer X;
P := X := X+X

```

Mathematically, P is not a function of type
I---~I, from integers into integers. The no-
tion of assignment in programming lan-
guages, in conjunction with function-like
procedures, forces us to consider locations
of identifiers as part of our universe of dis-
course [16]. In particular, let I be the set of
integers, L be a set of locations for the
identifiers in a program, and S (the "stores"
of values for a program) be a set of functions
mapping the locations of identifiers into
integers. Mathematically, P is a function
L X S --~ I X S. That is, P takes the loca-
tion, 1EL, of its argument and a store,
slES, as inputs, and returns an integer,
iCI, and a new store, s~ES, as outputs. The
integer i depends on the integer value stored
in location l of sl, and the new store, s=ES,
reflects the side-effect. Hence when we in-
voke P in an expression such as

```

3 + P(Y) + Y

```

```

Ten Mini-Languages • 125

```

```

two events occur: the first member, i E I of
(4 s) E I × S, is added to 3, and the second
member, s2E S (which reflects the changed
value in the location of Y in S), is used to
obtain subsequent values of Y.
Furthermore, consider the Lisp doublets:

```

```

DEFINE ((
(F (LAMBDA (X) (LAMBDA (Y) X)))
))
F(1)

```

```

Mathematically, the value of F(1) is the
"constant" function mapping any argument
into the integer one. However, the valua-
tion of F(1) in Lisp yields an error. There-
fore, in LisP, functions can only appear in
constructs where they will subsequently be
applied to arguments yielding values that
are not functions.
For many programming languages, there
are two other features of functions that do
not fit their mathematical counterparts.
First, many programming languages are
generous in the kinds of objects that can be
used as arguments to functions, but restrict
the kinds of objects that can be returned as
values. For example, ALGOL 60 procedures
can take numbers, Boolean values, labels,
switches, arrays, and procedures as argu-
ments, but can return only numbers and
Boolean values as results. Such restrictions
inhibit the usefulness of the language.
Secondly, the notion of recursive defini-
tion of functions is a feature of programming
languages that is avoided by many pro-
grammers and language implementers.
Mathematically, recursive definitions are
often a more succinct notation than inter-
active definitions. Consider the following
two definitions of a function "TOTAL,"
which takes a one-dimensional array A and
integer N as arguments and returns the sum
of the N elements A[1] through A[N]:

```

```

TOTAL: PROC(A, N); ARRAY A, INTEGER I, N, Z;
Z:= A[N]
I:= N;
L:IF I = 1 THEN GO TO M;
I:= I - 1;
Z:= Z + A[I];
GO TO L;
M: RETURN Z;
END TOTAL;

```

```

and

```

```

TOTAL (A, N) = IF N = 1 THEN A[N]
ELSE A[N] + TOTAL (A, N -- 1);

```

```

It is claimed that the second definition is
much more transparent because it avoids
unnecessary details, in this ease the notion
of sequence of operations.
It is hoped that future developments in
programming languages will fully recognize
the notion of functions and their important
mathematical properties.

```

```

MINI-LANGUAGE 5:
PASSING OF PARAMETERS

```

```

One of the more confusing features of pro-
gramming languages is the notion of passing
of parameters. The intent of mini-language 5
is to distinguish three commonly used meth-
ods for passing parameters, here denoted as
"call by copy value," "call by location,"
and "call by expression." These three meth-
ods are based on the "call by value" of
ALGOL 60, "call by reference" of CPL, and
"call by name" of ALGOL 60.

```

Description of Language Elements
Array ide~tifiers are comprised of the
symbols AIA2 .... The value of an array
identifier is a one-dimensional array with ten
(initially unspecified) elements. Procedure
identifiers comprise the symbols P1 P2 ...,
and parameter identifiers comprise the
symbols a b • • • z.
A parameter specification is a string of
one of the following forms: exp l, copy val l,
or loc l, where 1 is a list of parameter identi-
fiers. A procedure declaration is a string of the
form proe p(l) s c end, where p is a proce-
dure identifier, l a list of parameter identi-
tiers, s a sequence of parameter specifica-
tions, and c is a sequence of assignment com-
mands (defined below) such that: each
parameter identifier in l is different; each
parameter identifier in s is different and
occurs as one of the parameters in l; and
each identifier in c is a parameter identifier.
For example, the following declaration rio-
lares each of the above requirements

```

proc Pl(a, b, a)
exp a, d
loc a
D:=I
end

```

```

An expression is either a numeral or a
named expression. A named expression is
either an identifier, a parameter identifier,
or an array identifier followed by an expres-
sion enclosed ill square brackets.
An assignme~t command is a string of the
form el := e2, where el is a named expres-
sion, and e2 is an expression. The execution of
an assignment command results in assign-
ing the value of e2 to the location denoted by
e~. (For a more detailed discussion of assign-
ment, see mini-language 2.) In particular, if
e~ or e2 contains an expression of the form
a[e], where a is an array identifier and e is an
expression whose value is the natural number
n, then a[e] denotes the ~tth element of the
array a.\*
A procedure command is a string of the form
p(l), where p is a procedure identifier, and
1 is a list of expressions. The evaluation of
the procedure command of this form is as
follows:

1. Obtain the sequence of assignment com-
   mands e given ill the declaration of p.
2. For each parameter i called by "expres-
   sion," replace each occurrence of i in c
   by the corresponding expression e in 1.
3. For each parameter i called by "copy
   value," prefix to c the command i := e,
   where e is the corresponding expression
   for i in l.
4. For each parameter i called by "loca-
   tion," obtain the corresponding expres-
   sion e for i: if e is an identifier, let L~
   denote its location; and if e is an array"
   expression A[e'], let L~ denote the loca-
   tion of the r~th element of A, where n is
   the value e'. Then replace each occurrence
   of i in c by L~.
5. Execute the sequence of assignment com-
   mands c', formed by the above rules,
   with the following interpretation for

- For example, if the value of the array name
  A1 is the array whose ten elements are 4,A,A,5,5,
  A,1,2,3,4 (where A denotes an unspecified ele-
  ment), then the value of Al[7] is 1, and the value
  of Ai[AI[7]] is 4.

```

```



```

```

parameters called by location: if an Lg
is evaluated on the right-hand side of an
assignment command, its value is the
object currently stored in the location L~ ;
and if an L~ appears on the left-hand side
of an assignment command, the assign-
ment of the value of the right-hand side
is made to the location L~.

```

Program Execution
A program consists of a sequence d of
procedure declarations followed by a se-
quence c of assignment and procedure com-
mands such that:

1. each declared procedure identifier in d
   is different;
2. each procedure identifier in c is declared
   in d;
3. the number of expressions in the expres-
   sion list of a procedure command is
   identical to the number of parameters in
   the corresponding procedure declara-
   tion;
4. no parameter identifiers occur in c; and
5. no procedure declaration in d contains a
   parameter that is called by location,
   appears on the left side of an assignment
   statement, and corresponds to an expres-
   sion that is a numeral--i.e., a condition
   that leads to an assignment to a numeral
   is syntactically illegal.

```

EXAMPLE 1 :
proc P1 (a, b)
copy val a, b
X := a
a:~-b
b :~ x
end
I :=
A[I] := 6
P1 (I, A[I])

```

```

EXAMPLE 2 :
proc P2(a, b)
location a, b
x:=a
a:=b
b:=x
end
I :=
A[I] := 6
P2(I, A[I])

```

```

Ten Mini-Languages • 127

```

```

EXAMPLE 3 :
proc P3(a, b)
exp a, b
x:=a
a:=b
b:=x
end
I :=
a[I] := 6
P3(I, h[I])

```

```

Suppose we wish to define and use a pro-
cedure that swaps the values of its two argu-
ments, and we must select one of the three
options above. Which one shall we choose?
The three examples are identical except
that tlle parameter specifications in proce-
dures P1, 1)2, and P3 are different.
In Example 1: the values of I and A[3J
will be set to 3 and 6, respectively; and
the procedure call PI(I, A[I]) will be exe-
cuted-i.e., the values of a and b will be set
to 3 and 6, respectively, and the values of
x, a, and b will be set to 3, 6, and 3, respec-
tively. The values of I and A[3] will remain
unchanged, so we shall not elect P1.
In Example 2: the values of I and A[3]
will be set to 3 and 6, respectively; and
the procedure call P2(I, A[I]) will be exe-
cuted-i.e., the locations La of I and Lb of
A[I] will be determined, and the commands
x := La, La := Lb, and Lb := x will be
executed, which will result in settling the
values of I and A[31 to 6 and 3, respectively.
Thus, procedure P2 of Example 2 yields the
desired outcome.
In Example 3 we have a rather surprising
result:

1. the values of I and A[3] will be set to 3 and
   6, respectively; and
2. the procedure call P3(I,A[I]) will be
   executed--i.e., the commands

```

```

X :~-- I

```

```

I := AiI]

```

```

A[I] := x

```

```

will be executed, which will result in 3
being assigned to x, 6 to I, and then 3
to A[6].
Therefore, we elect o~dy procedure P2.

```

Discussion
The above three examples illustrate an
important feature of programming lan-
guages: namely, the differences in three
commonly used methods of passing param-
eters to procedures. To explain this differ-
ence, one may well ask: what is the "value"
of each procedure? Following the ideas of
Strachey [16], we consider the notion of a
"store."
A store is a mapping of locations into
values, where each identifier in a program is
considered to have a location, and the value
associated with this location in the store is
taken as the current value of the identifier.
A procedure with n parameters may then be
viewed as a function mapping n arguments
and a store into a new store. A procedure
command is viewed as an application of the
function to the arguments given in the com-
mand and to the store of values existing be-
fore the command is executed• The new,
returned store reflects the change in values
of the program identifiers.
In particular, let

ID denote the set of identifiers for a program;

```

LOC denote the set of locations associated
with the identifiers in ID;

```

VAL denote a set of values (for mini-lan-
guage 5, VAL consists only of the natural
numbers) ;
EXP denote a set of expressions; and
STR denote a set of stores, i.e., functions
(LOC ~ VAL) mapping locations into
values.
If s is a store, v a value, and l a location, let
s[v/l] denote the store s' that is identical to
s except that l is mapped into v.
The value of procedure P1, whose argu-
ments are called by copy value, is the func-
tion:

```

X(vl~VAL, v2CVAL, sESTR).s

```

```

That is, P1 is a function that, when applied
to two values, Vl and v2, and a store, s,
returns the identical store s. Hence P
produces no swapping of values on a store to
which it is applied.
The value of the procedure P2, whose

```

```

arguments are called by location, is the func-
tion:

```

```

X(/1E LOC, 12ELOC, sESTR)

```

- s[s(l~)/ll][s(ll)/l~]

```

That is, P2 is a function that, when applied
to two locations, ll and 12, and a store, s,
returns a new store that is identical to s
except that ll -o v2, where v2 = s(l~), and
12 --~ Vl, where Vl = s(/1), which is precisely
the desired effect. In particular, the proce-
dure command P2(I, A[I]) swaps the values
stored in the locations reserved for I and
NIL
The value of the procedure P3, whose
arguments are called by expression is the
function:

```

```

X(elE EXP, e~E EXP, sE STR)• s[v2/ll][vj/12']

```

```

where v~ is the value of e~ using the store of
values in s; ll is the location denoted by el
using the store of values in s; s' is the store
s[v2/ll]; Vl is the value of el using the store
of values in s; and 12' is the location denoted
by e2 using the store of values in s'. Here the
location 12' is dependent on the store s' =
s[v2/ll]; i.e., any use of el (used in obtaining

11. in e2 (used in obtaining l() may result in a
    different location l~' for e2 from that exist-
    ing before the procedure invocation.

```

```

MINI-LANGUAGE 6:
STATIC TYPE CHECKING

```

```

The partitioning of objects into classes or
"types" is a prominent feature of many
programming languages• Often, operations
are defined only over data of a certain type.
This gives rise to a basic question: is each
operation in a program defined for the partic-
ular data elements it is given? If this question
can be answered before execution of a pro-
gram (as, for example, in FORTRAN), it is a
case of static type checking• If this question
can only be answered during execution of a
program (as, for example, in PAL or GEDAN-
KEN), we have a case of dynamic type check-
ing. In some languages (for example, ALGOL
60 or SNOBOL), this question can be answered

```

```



```

in part before execution and in part only
during execution.
Mini-language 6 treats the case of static
type checking, with the intent that a pro-
posed program not be executed unless all
type requirements are satisfied. (Mini-
language 7 treats dynamic type checking.)

Description of Language Elements
A type designation is either: 1) the symbol
"N," in which case it denotes the class of
natural numbers; or 2) a string of the form
(t~, • • • , t~ --~ t~+~), where the t~, 1 ~ i ~4 n-~ 1,
are type designations, in which case it de-
notes a class of functions whose domain is
the Cartesian product of the classes denoted
by h, "'" , t~ and whose range is the class
denoted by t~+~.
Primitive objects in mini-language 6 in-
clude, in addition to the natural numbers,
a unary function, SQ, for computing the
square of a natural number, and an infix
binary function, +, for computing the sum
of two natural numbers. The natural num-
bers have a type N, and the functions SQ
and -/- have types (N--~N) and (N, N--~N).
A declaration specifies an identifier as
representing a class of objects of only one
type.\* A declaration consists of a string of
either of the following forms:

```

1. dec l type t

```

```

2. dec f(l) := e where It

```

where l is a list of identifiers, t a type desig-
nation, f an identifier, e an expression (de-
fined below), and It is a list of type designa-
tions such that each identifier in 1 is different;
each identifier in e occurs in l; and the num-
ber of type designations in It is identical to
the number of identifiers in 1.
A declaration of form (1) specifies that
each identifier in I has the type t. A declara-
tion of form (2) : a) assigns to f the function
from arguments in the domain, denoted by
t~, • •., t~ = It, into the value of the expres-
sion e, obtained by replacing each identifier
in l by its corresponding argument; and b)
specifies that the type of f is (h, "",

- Note that this requirement is not made in
  mini-language 7, where the types of objects as-
  signed to identifiers may vary.

```

Ten Mini-Languages • 129

```

```

tn --~ tn+l), where t:, • • • , tn = It are the type
designations given in the declaration of f,
and tn+l is the type of the result expression e
(defined below), obtained by using the types
h, ". , t~ for the corresponding identifiers
of l in e.
An expression consists of a string of one of
the following forms:

1. p
2. i
3. SQ(e)
   (provided e is of type N)
4. (d+e)
   (provided d and e are of type N)
5. f(el, ..., en)
   (provided fix of type (h, "" , tn ----~ tn+~),
   and e~, • • • , en are of corresponding type
   t2, ''',tn)
6. (if d>e then el else e2)
   (provided d and e are of type N, and el
   and e2 are of the same type),
   where p is a primitive symbol, i and f are
   identifiers, and d, e, e,, ... , e, are expres-
   sions.
   Expressions are of the following types:
7. an expression of form (1) is of the same
   type as p;
8. an expression of form (2) is of the type
   declared for i;
9. if e is of type N, then an expression of
   form (3) is of type N;
10. if d and e are of type N, an expression of
    form (4) is of type N;
11. if the types of el, ... , e~ are tl, "'',
    t~, and if f is declared to be of type
    (h, • • • tn --~ t~+l), then an expression of
    form (5) is of type tn+~ ; and
12. if d, e are of type N, and el, e2 are of the
    same type, then an expression of form (6)
    is of the same type as el or e2.
    An assignment command consists of a
    string of the form i := e, where i is an identi-
    fier, and e is an expression such that the
    types of i and e must be identical.
    A program consists of a sequence d of
    declarations followed by a sequence c of
    assignment commands such that each iden-
    tifier occurring in c is declared once and
    only once in d, and all of the above require-
    ments on types are satisfied.

```

```

Program Execution
The commands of a program are executed
sequentially, with the conventional meaning
for addition, the squaring operation, assign-
ment, conditional expressions, and func-
tional application.

```

```

EXAMPLE 1:
dec A, B type N
dee F(X) := 8Q(SQ(X)) where N
A:=
B := F(A)

```

```

EXAMPLE 2:
dec X type N
dee A, B type (N----~N)
dec F(X) := SQ(SQ(X)) where N
dee G(X, Y) := X(Y) where
(N--IN), N
A:=SQ
B:=F
X := (G(A, 1) + G(B, 2))

```

```

EXAMPLE 3 (syntactically illegal):
dee A, B. type N
dee F(X) := (X+X) where N
dee G(X, Y) := iX+Y) where N, N
dee H(X, Y) := X(Y) where (N---~N), N
A := H(F, 1)
B := H(G, l)

```

```

EXAMPLE 4 (syntactically illegal):
dee A type N
dec B type (N~N)
dec F(X) := X where N
dee G(X) := X where (N-+N)
dee H(X, Y) := X(Y) where ((N--+N)---~
(N~N)), (N~N)
g := H(G, SQ)
A := B(2)
B := H(F, 2)

```

Example 1 results in setting the value of
B to 16. Example 2 results in setting the
value of X to 17.
Example 3 is illegal because of the state-
ment "B := H(G, 1)," where H, a function
of type ((N--~N), N --~ X), is applied to
arguments G, 1 of types (X, N-+X), X.
Using the rules given previously, we can
determine that the program of Example 3
is syntactically illegal:

```

1. A and B are declared to be of type N;
2. F is declared to be of type (N---aN);
3. G is declared to be of type (N, N ~ N);
4. H is declared to be of type ((N--iN),
   N ---~ N) ;
5. H(F, 1), where F, 1 are of types (N--~N),
   N and H is of type ((N----iN), N --~ N),
   is of type N;
6. A := H(F, 1) is type-wise of the form
   N := N, hence is type-wise correct;
   therefore,
7. H(G, 1), where G, 1 are of types (N,
   N--~N), N and H is of type ((N--~N),
   N -+ N), is illegal because the type
   (N, N--~N) of G is not identical to the
   type (N--+N) of the first argument of H.
   Example 4 is illegal because of tile state-
   ment "B := H(F, 2)," where H, a function
   of type (((N--)N)---~(N--~N)), (N--~N)
   (N--+N)), is applied to arguments F and 2
   of types (N--+N) and N. Note, however,
   that the application of H to F and 2 is
   semantically well-defined, i.e., results in
   applying F to 2, which returns the value 2.
   (Programs like that of Example 4 will be
   allowed in mini-language 7.) Note, also,
   that in all syntactically legal programs in
   mini-language 6, no condition leading to a
   type error can arise during execution.

```

```

Discussion
In mini-language 6, there were four major
assumptions underlying the notions of types.
(The reader is referred to the work of Morris
[11] for a discussion of types and type check-
ing.)

```

```

Assumption 1

```

```

A type is either an atomic type, in which
case it denotes a class of primitive objects,
or it, is a functional type (h, "-, t,
t~+l), where h, "", t,,, t,+l are types, in
which case it denotes a class of functions.

```

```

Assumption 2

```

```

The number of atomic types is finite.

```

```

Assumptions 1 and 2 seem intuitive, but
they do raise some important questions:
notably, what are the atomic types for our
universe of discourse? We readily accept

```

pointers, integers, rationals, Booleans, and
strings as denoting atomic types. But what
about labels, locations, PL/I storage class
attributes (automatic or static), and PL/I
file attributes (buffered or unbuffered)?
Are these language issues to be considered as
part of type considerations? Consider, for
example, an assignment statement of the
form el := e2. As part of our type checking
we usually want to ensure that e~ and e
are both numeric or both Boolean. Might
we also want to ensure that el denotes a
location and e2 a value, so as to include, say,

```

(if X>Y then I else J)

```

```

:= (if A>B then 1 else 2)

```

```

but exclude

```

```

(if A>B then 1 else 2)

```

```

:= (if X>Y then I else J)?

```

```

This issue remains unresolved.

```

```

Assumption 3

```

```

The types of all identifiers are declared.

```

```

This appears to be mostly true for most
progranlming languages. Certainly in FOR-
TRAN, BASIC, CPL, and PL/I, the types of
most identifiers are declared either ex-
plicitly, implicitly, or by default. The major
exception here is that some programming
languages allowing procedures as formal
parameters (e.g., ALGOL 60 and PL/I) do
not require complete specification of the
types of the arguments corresponding to the
formal parameters. For example, in ALGOL
60, the types of formal parameters need not
be fully specified. Consider the following
procedure headings:

```

```

1. integer procedure P(X, Y);

```

```

2. procedure R(X, A, F,); integer X;
   integer array A;
   integer procedure F;

```

```

In (1), no types are specified for X and Y. In
(2), the type of X is specified, but the di-
mensions of array A and the number and
types of the parameters of F are not specified.

```

```

Ten Mini-Languages • 131

```

```

The lack of full parameter specifications
gives rise to several debatable type-checking
issues: notably, how much type checking
should we perform on programs if we have
only partial information on the types of
identifiers required? This is certainl~ a
question of language design and implementa-
tion. On the one hand, the language designer
may wish to give the user latitude in the
assignment of objects of varying types to
variables and trust the user's discretion that
the operations in the program will ulti-
mately be applied to operands of a compati-
ble type. On the other hand, if type errors
can give rise to difficult cases of program
debugging or to undesirable machine con-
sequences, the language designer may wish
to eliminate any language construct that
could ultimately lead to a type error.

```

```

Assumption 4

```

```

Each identifier has one type.

```

```

This assumption is not true for some pro-
gramming languages. Objects that are of
more than one type are said to be "poly-
morphic." There seem to be three distinct
kinds of polymorphism: 1) objects that are
"simple" polymorphic--i.e., of a finite
number of types; 2) objects that are "para-
metric" polymorphic; and 3) objects that
have "circular" types.
For example, consider the operation "+"
in ALGOL 60, which can take real or integer
operands, and yields a result of type real if
one of the operands is of type real and of
type integer if both operands are of type
integer. Hence + can be said to have a type
consisting of the union of types

```

```

(R, R --~ R)

```

```

(R, I --~ R)

```

```

(I, R -~ R)

```

```

(I, I --~ I)

```

```

where R and I denote the types "real"
and "integer."
Consider, also, the following ALaOL 60
declaration:

```

```

integer procedure APPLY (F, X);
APPLY := F(X)

```

Here the types of X and F are constrained
only in that, if t is the type of the argument
corresponding to X, then the argument cor-
responding to F must be of type [t --~ I].
Hence the type of "APPLY" is

```

((t~I), t ~ I).

```

```

Such a procedure is said to be parametric
polymorphie in that the type of the pro-
cedure depends on the types of the argu-
ments to which it is applied. For example,
the procedure call "APPLY (A, B)" is
type-wise correct for any of the following
type pairs for arguments corresponding to
A and B:
(I~I), I
(I--~R), R
((I--~R)--~R), (I--~R)
and for an infinite number of other types.
More generally, a parametric polymorphic
procedure may contain multiple arguments
whose types may each be dependently con-
strained.
Furthermore, consider the following
ALGOL 60 program:

```

```

begin integer Y;
integer procedure G(F, X) ;
integer procedure F; integer X;
G:= ifX = 0then 1
else X\*F(F, X- 1) :
Y:= G(G, 4);
end

```

```

When executed, this program results in
assigning the value 24 (4 factorial) to Y.
The procedure G above is not recursive, but
contains a parameter F whose type is
circular, in particular, the procedure G
may take itself and an integer as arguments
and yield an integer result; i.e., the type of
G is any type
((~, i~i), i -~ i)
where a -- (a, I4I). Clearly, G(sq, 2) is
illegal, but G(G, 2) is legal. Circular types
do exist in ALGOL 60 and ALGOL 68, and
they must be faced.

```

```

Each of the above issues have important
ramifications for type checking. Since the
notions of declarations and types are major
features of programming languages, the
notions of type definition and type checking
deserve serious study.

```

```

MINI-LANGUAGE 7:
DYNAMIC TYPE CHECKING
The necessity for dynamic type checking
arises when objects of varying types may be
assigned to an identifier. In such cases, the
well-definedness of an evaluation of a
particular expression cannot be determined
until the step just prior to the application.
Mini-language 7 is devoid of type declara-
tions, and allows assignment of objects of
varying types to identifiers; therefore, type-
checking must be done dynamically. To
draw the contrast between dynamic and
static type checking, mini-language 7 is
similar to mini-language 6 except that
changes have been made in mini-language 7
to make static type checking impossible.

```

```

Description of Language Elements
Primitive objects in mini-language 7 are the
same as in mini-language 6.
A declaration is a string of the form dee
f(l) : = e, where f is an identifier, 1 is a list of
identifiersr and e is an expression (defined
below) such that each identifier in 1 must be
different, and each identifier in e must occur
in 1. A declaration of this form assigns to f
the function from arguments whose domain
includes any object into the value of the
expression e obtained by replacing the
identifiers in 1 by their corresponding argu-
ments. No single type is associated with an
identifier denoting a function.
Expressions are of any of the following
forms:

1. p
2. i
3. SQ(e)
4. (d+e)
5. f(el, ..., en)
6. (if d>e then el else e2),
   where p is a primitive symbol, i and f are
   identifiers, and d, e, el, ".- , en are expres-
   sions.

```

```



```

Expressions and their types are evaluated
as follows:

1. The value of a symbol p denoting a primi-
   tive object x is the primitive object x.
   The type of the value is the type of x.
2. The value of an identifier i is the object
   x currently assigned to i. The type of the
   value is the type of x.
3. If e is an expression whose current value
   is of type N, then the value of SQ(e) is
   the numerical square of the value of e,
   and the result is of type N.
4. If d and e are expressions whose current
   values are of type N, then the value of
   (d+e) is the numerical sum of the values
   of d and e, and the result is of type N.
5. If el, ... , e~ are expressions whose cur-
   rent values are v~, -.. , v~ and whose
   types are h, • • • , t~, then the type and
   value of f(o, "" , e~) are the type and
   value of the result of applying the value
   of f to Yl , " " " , Vn •
6. If d and e are expressions whose values
   are of type N, then the value and type of
   (if d>e then el else e2) are either the
   value and type of e~, if the numerical
   value of d is greater than the numerical
   value of e, or of e2, if the numerical value
   of e is not greater than the numerical
   value of d.
   A program (defined below) is in violation
   if, in the evaluation of an expression, any of
   the following conditions arises:
7. the value of the expression e in SQ(e) is
   not of type N;
8. the value of either expression d or e in
   (d+e) is not of type N;
9. the number n of arguments in an expres-
   sion f(e~, ... , en) does not match the
   number of arguments in the declaration
   of the function associated with f; or
10. the value of either expression d or e in
    (if d>e then e~ else e2) is not of type N.
    An assignment command consists of a
    string of the form i := e, where i is an identi-
    tier, and e is an expression. The execution of
    an assignment command results in assigning
    the value of e to i.

```

Program Execution
A program consists of a sequence d of
declarations followed by a sequence c of

```

```

Ten Mini-Languages • 133

```

```

assignment commands such that each func-
tion identifier occurring in c is declared once
and only once. The conventional meaning
for execution of programs is assumed.

```

```

EXAMPLE 1 :
dee F(X):= SQ(SQ(X))
A:=I
B:=
C:=F
D := C(B)

```

```

EXAMPLE 2 :
dee F(P, X, Y) := P(X, Y)
dee G(X, Y) := (X+Y)
dee H(P, Q) := P(Q(2))
A := F(G, 1, 2)
B := F(H, SQ, SQ)

```

```

EXAMPLE 3 :
dee F(X, Y) := (if Y>3 then (X+Y)
else X(Y))
A:=
B:=
C := F(A, B)
A:=SQ
B:=
D := F(A, B)

```

```

EXAMPLE 4: (leads to a type violation):
dee F(X, Y) := (if Y>3 then (X+Y)
else X(Y))
A:=
B:=
C := F(A, B)
A:=SQ
D := F(A, B)

```

```

In Example 1, the final values of A, B, C,
and D are, respectively: the natural number
1, the natural number 2, the function for
computing X 4, and the natural number 16.
In Example 2, the final values of A and B
are the natural numbers 3 and 16, respec-
tively.
In Example 3, the final values of A, B, C,
and D are: the function for squaring a natu-
ral number, the natural number 2, the
natural number 11, and the natural number
4, respectively. Note here that F is succes-
sively applied to objects of different types.
Furthermore, the deelaratibn of F could not

```

be syntactically legal in mini-language 6
since no type specification for X and Y could
lead to identical types for both (X-t-Y)
and X(Y); i.e., X cannot be both a natural
number and a function.
The final values of A, B, and C in Exam-
ple 4 are: the function for squaring a natural
number, the natural number 6, and the
natural number 11, respectively. The final
value of D is undefined since execution of
the statement "D := F(A, B)" leads to a
type violation. The type violation occurs
in the attempt to add the square function
denoted by A to tile number 6 denoted by
B.

Discussion
The basic difference between static and
dynamic type checking is that types are
associated with identifiers in the static ease,
whereas in the dynamic ease, types are asso-
ciated with values. Thus in tile static case
we can cheek for the possibility of type errors
before execution, and in tile dynamic case
we nmst wait until execution. The disad-
vantage of requiring a program to be free of
type errors before run-time usually implies
the restriction of the wflues of identifiers to
one type only.
At this point, tile reader may well ask:
what really are tile essential differences
among mini-language 4 (functions), mini-
language 6 (static type checking), and mini-
language 7 (dynamic type checking)? First,
the difference between mini-languages 6 and
7 is clearly the difference between static and
dynamic type checking; i.e., types are associ-
ated with identifiers in the static ease and
with values in the dynamic case. Further-
more, both mini-languages 6 and 7 are quite
close to their programming language counter-
parts. However, mini-language 4 is at the
root of this discussion, because it treats the
mathematical notion of functions (with free
variables and reeursion) directly, while mini-
language 6 (static type checking) treats
functions whose domain and range are re-
stricted to certain types, and mini-language
7 treats functions in much the same way as
mini-language 4, except that the notion of
type checking is brought to tile fore.
Few current programming languages em-

```

ploy dynamic type checking exclusively. On
the credit side, dynamic type checking is
usually easy to implement and allows the
programmer considerable flexibility in assign-
ing objects of varying types to identifiers.
Furthermore, for input/output (where the
values stored on the input/output medium
cannot be known before execution), for
dynamic linking of procedures, and in eases
where complete type declarations are not
required, many programming languages must
at least partially deal with dynamic type
checking. On the debit side, dynamic type
checking slows execution. Furthermore, to
determine whether a construction is type-
wise illegal, we must wait for actual type
errors to occur during execution. Therefore,
we can never be really sure that a program
is type-wise correct until we have exercised
all alternatives, which is sometimes a risky
proposition.

```

```

MINI-LANGUAGE 8: STRUCTURED DATA

```

```

One application of programming languages
that notably lacks a coherent blend of the-
oretieal and practical understanding is the
area generally subsumed under the name
"data structures." The naming, searching,
deleting, sharing, and updating of items in a
data structure are critical issues. Mini-
language 8 is an attempt to deal with some
of these issues.
Mini-language 8 was difficult to devise.
In the author's opinion, the concept of a
data structure is still quite vague, and none
of the existing methods for providing a data
structure facility in a programming language
are satisfactory. Two issues appear para-
mount in providing a useful data structure
facility. First, the user of a language ought
to be able to define his own data structures
and his ow\*~ operations on structures. See-
ondly, tile definition of a data structure
should automatically provide definitions of:

1. a "constructor" function, which, when
   applied to suitable arguments, yields an in-
   stance of the defined data structure; 2)
   "selector" function, which, when applied to
   an instance of the defined structure and the
   name of one of its components, yields the

```

```



```

```

desired component; and 3) a "predicate,"
which, when applied to an arbitrary struc-
ture, yields a value of "true" or "false" ac-
cording to whether the structure is an in-
stance of tile defined structure or not. An
attempt to satisfy these criteria has been
made by Standish [15], and mini-language 8
is based on his work.

```

Description of Language Elements
Along with the imtural numbers, the
primitive objects of mini-language S include
a class of objects called "pointers." The
value of a pointer is tile location at which
another object is stored. In diagrams, a
pointer is represented by' a directed arrow
terminating at the location of an object.
Also included in the class of pointers is a
special object, represented by the symbol A,
which is interpreted as the "null" pointer--
i.e., a pointer with no associated location.
A structure is either a primitive object or
an n-tuple of objects (~) 2) each of which is,
itself, a structure. A structure is represented
in diagrams by a block, as shown in Figure 1,
in which each element a~ in tile block is
either the representation of :t primitive ob-
ject, if the element denotes a primitive ob-
ject; or a "dotted arrow" to another block,
if the element denotes an ~-tuple of objects
or a subeomponent of tile object being repre-
sented.
A structure ide,~tiJier consists of a string of
two or more capital English letlers.
A compo~e,~t ide~t~jier consists of a siring
of two or more h)wer-ease English letters.
A unit deser@tor is a symbol whose w'due
is a class of objects. "Primitive" unit de-
scriptors are the symbols "num," "ptr,"
or "prim," which denote, respectively, the
class of natural numbers, pointers, and
primitive objects (natural numbers and
pointers). A "named" unit descriptor is a
structure identifier and denotes the class of
objects defined in the declaration of file
structure identifier (structure declarations are
defined below). A unit descriptor is either a
primitive unit descriptor or a named unit
descriptor.
A compo~e~t descriptor is a string of the
form

```

Te~ Mini-Languages

```

```

(]l

```

(12

```

135

```

```

Gn

```

```

FI(;. 1. Block representation of an n-tuple.

```

```

[Ci:Ul I C2:U2 ] "'" I Cn:Uzl]
where the ei, 1 ~< i ~<,~, are component identi-
fiers, and ui, 1 ~< i ~< ~, are unit descriptors.
A component descriptor denotes the class
of ,~-tuples of objects obtained from the
Cartesian product of the sets denoted by
7-/1 , 'll2 , ' ' " ~ ~n •
A structure declaratio~ is a string of either
tile form
dec s = d
or
dec s = sl (tl V 82 de V ''' V 8n dn

```

```

where s, Sl , • • • , s,, are structure identifiers,
and d, d~, ... , d, are component descrip-
tors. Structure declarations of either of these
forms define s as representing members of
the class of structures defined either by d or
jointly by (/~ , de, ... , d~, and define each
structure identifier sl, 1 4 i~< n, prefixing a
component descriptor as representing the
class of structures defined by the component
descriptor d~. For example, consider the
following structure declarations.

1. dec INFO = [birthday:hum I salary:
   hum I period: num]
2. dee ACCOUNT = [iden:num [
   employee : INFO]
3. dee LIST = UXILIST [atom:prim]
   v PAIR [head : prim I
   tail: LIST]
4. dee TREE = UNITREE [leaf:hum]
   v BINTREE [node: num [
   lb: TREE I rb: TREE]
   The first declaration defines a set of triples
   each of which contains three natural num-
   bers, such as the objects represented in Fig-
   ure 2. The second declaration defines a set
   of pairs of which tile first element is a natural

```

```

Computing Stu'xeys, Vol. 3. No. 3. September 1971

```

```



```

```

number (perhaps a social security number)
and the second is an object defined in the
first declaration, such as the objects repre-
sented in Figure 3. The third declaration de-
flues a class of objects called "lists," some
of whose members are represented in Figure

```

4. The encircled object in Figure 4 is, strictly
   speaking, not part of the list, but represents
   one object to which the pointer might point.
   The fourth declaration defines a class of ob-
   jects called "trees," some of whose members
   are represented in Figure 5.
   A constructor expression is a string of the
   form (cons s)(1), where s is a structure identi-
   tier declared in a structure declaration, and
   l is a list of expressions (an expression is de-
   fined below) whose value is a list of objects.
   The value of a constructor expression is an
   instance of the use of the objects of tile list
   l by the structure s. For example, using the
   structure declarations given previously, tile
   evaluation of the following four constructor
   expressions results in the construction of the
   four objects of Figure 6:

```

1. (cons INFO) (1921, 300, 30)

```

```

2. (cons ACCOUNT) (022325795,
   (cons INFO) (1921, 300, 30))

```

```

3. (cons PAIR) (1, (cons PAIR)
   (2, (cons PAIR) (3, A)))

```

4. (cons BINTREE) (1, 2, 3)

In general, the value of a constructor ex-
pression (cons s)(l) is obtained as follows:

1952 194 3

Tg ,oo

30 I :30 30

```

FIc. 2. Some objects defined by Declaration (1).

```

```

1. The expression list l is evaluated yield-
   ingalistofobjectsl' = xl,x2, ...,x,.
2. Let d be the component descriptor

```

```

I c2:u J --. I c,,:un]
for s.

3. The value of (cons s)(l) is the n-tuple of
   objects constructed from the x~.
4. Tile case where more than one component
   descriptor is given for s or where the
   n-tuple constructed from the x~ is not a
   member of the set denoted by s is in
   violation.
   A selector expression is a string of the form
   c~(e), where c~ is a component identifier, and
   e is all expression. If c~ is the ith component
   identifier for a component descriptor d, and
   if the value of e is an object x contained in
   the class represented by d, then the value of
   the selector expression c~(e) is the ith com-
   ponent of x. The case where the value of e
   is not a member of the class represented by d
   is in violation.
   A pointer expression is a string of the form
   ptr(e), where e is an expression. The value of
   a pointer expression is a pointer to the ob-
   ject defined by e. A wlue expression is a
   string of the form val(e), where e is an ex-

```

```

2L /
FIG. 4. Some objects defined by Declaration (3).

```

004445557[

13o

```

FIG. 3. Some objects defined by Declaration (2).

```

0225257951

```

P--
I 3o

```

```

Ten Mini-Languages • 137

```

### t

```

I I ,I I
\ I
I ~ /

```

###### I/ \

```

/ \
\
\
\

```

```

,l,
/ \
/ \
/ \

```

```

FIG. 5. Some objects defined by Declaration (4).

```

(I) (2)

##### I / ' \

```

! \
/
(3) ~ (4)

```

```

FiG. 6. Objects constructed by 4 constructor expressions.

```

```

\
\

```

pression. If e is an expression whose value is a
pointer to an object x, then the value of
val(e) is 9:; if not, then the value of val(e) is
in violation.
An expression is either an identifier, con-
structor expression, selector expression,
pointer expression, or value expression.
An assignment statement consists of a

```

string of either the form 1) i := el or 2)
ci(e) := ei, where i is an identifier, ci a
component identifier, and e, el are expres-
sions. Let v, vl denote the values of e, el.
The execution of an assignment statement of
form (1) results in assigning a "copy" of v
as the value of i. The execution of an assign-
ment command of form (2) results in as-

```

```

signing a copy of v, as the value of lhe c~
component of the wflue of o, provided v~
is an instance of the class denoted by c~.
If not, then the command is in violation.
A predicate is a string of the form (is
s)(e), where s is a structure identifier, and e
is an expression. The wdue of a predicate is
die truth wflue "true" if the wflue of e is
an instance of the class of objects represented
by s. Otherwise tile value is "false."
A repeat stateme~d is a string of the form
if p then cl else repeat after c2
where p is a predicate, and c~ and c2 are
assignment commands. The execution of a
repeat command is as follows: if the value of
p is "true," then cx is executed; otherwise c2
is executed, and the repeat statement is,
itself, executed again.

```

```

Program Execution
A program consists of a sequence s of
structure declarations followed by a sequence
t of assignment and repeat commands such
that: eaeh deelared structure identifier is
different; each structure identifier in the
program is declared; each component iden-
tifier in s is dift'erent; and eaeh component
identifier in t occurs in s.

```

EXAMPLE 1 :
dec LIST = UNILIST [atom:prim]
v PAIR [hd : prim I tl : LIST]
dec TREE = UNITREE [leaf:nnm] v BINTREE
[node:hum I Ib:TREE I rb:TREE 1
A := (cons BINTREE) (1, 2, 3)
B := (cons BINTREE) (4, 5, 6)
C := (cons PAIR) (1, (cons PAIR) (ptr(A), 3))
P := ptr (C)
if (is BINTREE) (val(P)) then
hd (val (P)) := ptr (B)
else repeat after
P := ptr(tl(val(P))

```

EXAMPLE 2:
dec PERSON = [birthday:num I dad:ptr ]
youngestkid: ptr]
A := (cons PERSON) (1900, A, A)
I := (cons PERSON)
(1930, ptr(A), A)
youngestkid(A) := ptr(I)
J := (cons PERSON)
(1932, ptr(A), A)
youngestkid(A) := ptr (J)
X := (cons PERSON)
(1955, ptr(I), A)
youngestkid(I) := ptr(X)

```

```

After execution of the first three con>
nmnds in Example 1, the objects of Figure 7
are formed. Execution of the remaining
statements in tile program results in lhe
conversion of these objects to those shown in
Figure S.
In Example 2, we wish to develop a strue-
ture that gives the date of birth of the de-
eendanls of a pcl'sO1~ named A and, for each
offspring, lhe names of his father and young-
est child. The first command represents 1he
birth of A. The next four commands repre-
sent the successive births of children I and
J to A, and the subsequent two commands
represent tile birth of child X to I. Tile struc-
ture of Figure 9 is obtained after execution
of these commands.

```

```

Discussion
There are already many techniques for
data structure definition and use, especially
in information retrieval, graphics, and large
computer systems, in a sense, however, we
do not need data structures at all. l"or any
programming language with given primitive
objects and primitive kinds of structure, we
can transform a problem imo llle domain of
the programming language. However, this
transformation often obscures fundamental,
higher-level properties. The itbility to define
data structures is, in parl, the ability to
create our own structural domain. This is
similar to eommuniealion theory where
working in the frequency domain rather than
I he time domain eonsiderably illuminal es the
processes of filtering, modulation, and con-
volution.
Among the attempls to develop data struc-
ture facilities are several graph theoretic ap-
proaches, the binary list strueture of Lisp
1.5, the symmetric list structures of SLIP,
the plexes of AED/0, the ring structures of
LEAP, and the array facilities in most pro-
gramming languages. I"oi' general applica-
tions, the graph theoretic and list approaches
have the disadvantage of forcing tim user to
think only in terms of very primitive notions,
i.e., nodes and pointers or lists. The plex and
ring structure notions are quile widely ap-
plicable, but, again, the user must eoueh his
thinking in terms of these primitive notions
alone; furlhermore, the constructor, selee-

```

```



```

```

Te~ M#d-La~guages • 139

```

```

C:

```

```

C:

```

' 1 .... -t:l--I---U-I

## 1

```

A: B:
I t I \X
I \
I \
I \

```

```

4

```

```

/ \
/ \ \
/

```

```

Fro. 7. Objects formed by the first 3 commands of Example 1.

```

```

I 4
A: B:

```

```

/ /I', \ / \
/ \ \
/ \ / \

```

#### m m

```

Fro. S. Objects formed at the completion of Example 1.

```

tor, and predicate functions for each struc-
ture nmst be defined separately. The array
facilities in most programming languages are
quite rigid.
A good data structure facility should be
extensible. It seems hopeless to build into a
language individual facilities for lists, ar-
rays, trees, rings, stacks, and queues with all
their varieties and attendant properties. It
is hoped that current developments in ex-
tensible languages will yield a suitable data
structure facility for programming languages.

MINI-LANGUAGE 9: STRING MANIPULATION

Facilities for the recognition and replace-
ment of strings occur in several languages;
e.g., SNOBOL, CONVERT, AMBIT, PANON, and
AXLE. Mini-language 9 describes a set of
linguistic facilities for string manipulation.
The language is based on the normal al-
gorithms of Andrei Markov and on an ex-

```

tension to Markov's normal algorithms in
PANOX [4] and AXLE [2].

```

```

Description of Language Elements
The object alpt~abet comprises the capital
English letters, the five characters "(", ")",
"+", "\*", and ",", as well as a null string
(i.e., a string containing no characters at all).
The null string is denoted by the special
symbol "A".
The variables in mini-language 9 consist of
the symbols a b -.- z. Each variable is de-
filled as representing a set of slrings of ob-
ject alphabet symbols (see variable defini-
tions given below), initially, each w~riable
in mini-hmguage 9 represents the empty set
{ }, i.e., tile set containing no strings al all,
not even the null siring.
A patter~ is n string of object alphabet
symbols and variables. A pattern p repre-
sents the set of strings computed by concat-
enating, in order, from left to right, each of
the object alphabet symbols in p with any

```

```

Computm~z Storeys, Vol. 3, No. 3, September 1971

```

```



```

```

FIG. 9. Objects formed at the completion of Example 2 (in mini-language 8).

```

string represented by a variable in p, with
the requirement that multiple occurrences
of the same variable in a pattern must de-
note the same object string. For example, if
l is a variable denoting the set of English
letters, then the pattern "lMl" denotes the
set {AMA, BMB, ..., ZMZ}. Further-
more, if any variable in p represents the
empty set, then the pattern p represents
the empty set. For example, if s is a variable
denoting the empty set, then the pattern
"AsA" denotes the empty set.
Variable definitions are sequences of rules
of the form

```

v = p, lp21 '" I~,,~
where v is a variable, and p,., 1 ~< i~<n, are
patterns. The variable definitions jointly
define each variable on the left side of "="
as representing a set containing the union of
sets denoted by each pattern given on the
right side of "= ". For example, the variable

```

```

definitions:

```

```

1. l = AIB I ... IZ
   x=l
   8 ---= X ] SX

```

```

2. 1 = AIBI .-IZ

```

```

8 ~- XI8.'C

```

```

3. l= AInl-.. Iz
   x=A
   8 =- XlSZ

```

```

define the variables l, x, and s as represent-
ing the following sets:

```

```

1. 1 = {A,B, ..-,Z/
   z = {a, g, ..- , Zl
   s = {A, AN, AB, AC, .-. }

```

```

2. z = {a, B, ... ,Z}
   x--{ }
   s={ }

```

```

Computing Sm'veys, Vol. 3, No. 3, September 1971

```

3. 1 = {A,B, ...,Z}
   x = {hi
   s = {h}

A transformation definition is a construct
of the form

letx = p2--+ p, -+ (')s2 (.)s, t

p. --+ (.)s.\_l

where x is an identifier, p~, 1 <.i<.n, are
patterns, and s~, 1 ~< i ~< n, are strings of ob-
ject alphabet symbols and variables such
that each variable in s~ also occurs in p~,
and "(.)" indicates the possible occurrence
of a "." after "--+".
A pattern p~ is said to occur within an ob-
ject string Q if one or more of the strings
represented by p~ occurs within Q. The "left-
most and shortest" occurrence of p~ in Q is
the string (of the occurrences of pi in Q)
such that the occurrence begins with the
leftmost object symbol and is as short as
possible.
A string transformation X of the above
form, when applied to an object string Q, is
taken to mean:

1. Look down among the rules of X for the
   first rule in which pi occurs in Q.
2. If such a rule is found, replace the left-
   most and shortest occurrence of pi in Q
   with the string obtained from s~ by re-
   placing each variable v in si with the
   string used for v in p~. If a "." occurs
   after the "-+" in the substitution rule,
   terminate the algorithm. Otherwise, re-
   peat the application to the newly formed
   string.
3. If no such rule is found, terminate the
   algorithm.
   If the above algorithm terminates, the
   string obtained upon termination of the
   algorithm is the result of applying X to Q.\*
   For example, consider the variable defini-
   tions:

```

- The string transformation algorithm is com-
  putable only if the variables represent recursive
  sets. The variable definitions allowed in mini-lan-
  guage 9 define only context-free sets, which are en-
  compassed by recursive sets.

```

```

Ten Mini-Languages • 141

```

```

I=AJBI...IZ

```

```

x=A

```

```

s = l[ls

```

```

and the transformation definitions:

```

```

let A = [IA-+.A]

```

```

let B = [/A-+A]
let C = [xA--+A]
let D = [sAs--+A]
let E = [ls'-~s ]
L1 +.lllJ
then: A transforms YZAZY into YAZY; B
transforms YZAZY into AZY; C transforms
YZAZY into YZAZY repeatedly, but the
algorithm does not terminate; D transforms
YZAZY into A; and E transforms YZAZY
into YYY.
A result expression is a string of the form
t~<...t2<tl<s>>... >, where s is a string
of object alphabet symbols, and ti, 1 ~<i~.n,
are identifiers denoting string transforma-
tions.

```

```

Program Execution
A program consists of a sequence s of
variable definitions, followed by a sequence
t of transformation definitions and a result
expression r such that each identifier in r
occurs as the name of one and only one
transformation definition in t. The result of
executing a program with a result expression
tn <" " " t2 < ll < S)>" " " > is computed by suc-
cessively applying the transformations tl,
t2, ." , t, to an object string whose initial
value is s.

```

```

EXAMPLE 1 :
l =AJBI'"[Z
m = 1
Vlm, --+ ,~,l 7
= | (m, ~ m ( I
.A

```

```

P < (NOXIN) >

```

```

EXAMPLE 2 :
I=AIBt...IZ
w = lIlw
Y:W

```

```

[v, w* -+ w*, vq
/(w, _~w, ( i
let Q = |(w_) ~ w |

```

```

L()) ~.A
~,) J
Q < (HESSE, KAFKA, MANN) >

```

```

EXAMPLE 3 :
I=A]B]-..IZ
~) = Z I (a)
a = p lp\*aip+a
=zt(I)l,l+
y =X

```

# I

```

-p ,a --~ a ]
p+a ~ a
let R = (a) --~a

```

```

I
----~. NO J
R<I.(J+K)+J>

```

```

In Example 1, the string transformation P
defines a function mapping a parenthesized
string of letters into the string with the let-
ters reversed; hence, the value of the result
expression is the string "NIXON." hi
Example 2, the string transformation Q de-
fines a function mapping a parenthesized
list of words into the list with the words in
reverse order; hence, the value of the result
expression is the string "MANN, KAH~A,
HESSE." The string transformation R in
Example 3 defines a function mapping arbi-
trary strings into one of the two strings
"YES" or "NO" depending on whether or
not the input string is a well-formed arith-
metic expression. Hence, the value of the re-
sult expression is "YES."

```

Discussion
The increasing application of computers to
nonnumeric problems has resulted in the
devotion of considerable attention to areas
like data structures (see mini-language 8)
and string manipulation. The core issue that
separates string manipulation from other
application areas is the notion of "pattern
matching." The notion of pattern matching
is important in that it allows the user to de-
fine transformations that vary according to
the particular form or pattern of its operands.
Furthermore, as in mini-language 9, there is
a growing tendency in programming lan-

```

guages to allow the specification of patterns
in a generative or synthetic (as opposed to
algorithmic or procedural) way. As men-
tioned earlier in this paper, the appearance
of methods of definition that are non-al-
gorithmic and more goal-oriented seems to
be a major direction in programming lan-
guages.
While non-algorithmic methods are often
convenient for the user, they do pose some
problems. For instance, we must be able to
deduce an algorithm for carrying out defini-
tions that. are specified non-algorithmieally.
In mini-language 9, the use of context-free
grammar for specifying patterns ensures
that we can implement the pattern matching
defined for the application of a string trans-
formation to all object string. However, the
question of the eJ~ciency of using non-
algorithmic methods of definition in pro-
gramming languages is important.
It seems fair to say that if non-algorithmic
methods of definition prove useful to users,
techniques for efficient implementation will
ultimately be realized.

```

```

MINI-LANGUAGE 10: INPUT/OUTPUT

```

```

While every programming language provides
facilities for input and output of data, there
seems to be little agreement oil standard
methods for specifying input/output opera-
tions. FORTRAN uses the rather rigid format
statement approach, SNOBOL uses a pattern
matching operation for input and a single
print operation for output, and several
ALGOL 60 implementations use tile procedure
approach for defining functions for input/
output operations.
Clearly, input/output is partially machine
dependent, but some of its concepts appear
to transcend machine characteristics. Be-
cause of the profusion of input/output
methods, their occurrence in every pro-
gramming language, and the need for stand-
ardized, straightforward techniques to spec-
ify them, a mini-language devoted exclu-
sively to input/output has been devised.
Mini-language 10 is based on the proposal for
input/output conventions for ALGOL 60 [7]
and the notion of a "stream."

```

```



```

Description of Language Elements
The notion of a stream of items is akin to
the notion of a "list" of items, except that
the items in a stream are determined dy-
namically. In a sense, a stream is a (perhaps
infinite or initially undetermined) list whose
items flow by, one by one. A stream S is
specified by a list of expressions el, e~, • • • ,
e,. The first item in the stream is obtained
by evaluating the first expression, e~. If e~
denotes only one item, we take it as the first
item in the stream and use the list e2, .-. ,
e~ to obtain subsequent items. If e~ denotes a
series of two or more items, the first item in
the series becomes the first item in the
stream, e~ is changed to expression e~' indi-
cating that its first item has been removed,
and the list e~', e2, ... , e,~ is used to obtain
subsequent items. A stream is "exhausted"
when tlle list. used to obtain an item is imll.
A stream is "recycled" when the original list
of expressions e~, e2, • • • , e,~ is used again to
obtain subsequent items.
Two types of streams are used in mini-
language 10: "layout" streams, which
specify the way in which characters are ar-
ranged on tile input or output medium, and
"data" streams, which specify data objects
whose character representations appear on
the input or output medium.
Let us assume that, we have two devices,
the input medium and the output .medium,
each of which can be viewed as a teletype
containing an infinitely long piece of paper
allowing 100 characters per line. On the in-
put medium we shall look at the characters
printed thereon in the conventional order,
from left to right and line by line. On the out-
pat medium we shall print characters in the
conventional order.
The array identifiers comprise the symbols
A1 A2 .... Each array identifier represents
a one-dimensional array with an unspecified
number of elements. Data stream ide,~tifiers
comprise the symbols D1 D2 .--. Layout
stream identifiers consist of the symbols L1
L2....
An expression is either a numeral, a named
expression, or an arithmetic expression. A
named expression is either an identifier, or an
array identifier followed by an expression en-
closed in square brackets. An arithmetic ex-

```

Te~ Mini-La~guages • 143

```

```

pression is a string of either the form
(e~--ke2) or (el--e2), where el and e2 are ex-
pressions.
A layout expression is either a unit layout
expression or a replicated layout expression.
A replieator is an expression. A unit layout
expression consists of a replieator followed
by one of the symbols d, b, or l. A replicated
layout expression consists of a replieator
followed by a unit layout expression enclosed
in square brackets.
A layout stream declaration is a string of
the form

```

```

layout stream p = l

```

```

where p is a layout stream identifier, and I is
a list of layout expressions. The items of a
layout stream are obtained as follows:
l) If tile first expression l~ of the current list
l~, lj, • • • , I, is a unit layout item, then
l~ is taken as the next item, and the list
lj, ..., In is used to obtain successive
items.

2. If the first expression l~ of the current
   list l~, lj, - - - , l,~ is a replicated layout ex-
   pression of the form r[u], where r is a
   replicator and u is a unit layout expres-
   sion, then if r is an expression whose cur-
   rent value is )1, u is taken as the next
   item, and the list (/"-1)[u], ly, ..- , 1,~ is
   used to obtain successive items; other-
   wise, the list li, • • • , In is used to obtain
   the next and successive items.
   A data expression is either a unit data ex-
   pression or an iterative data expression. A
   unit data expression is a named expression.
   An iterative data expression is a string of tile
   form
   bfori:= e~toe2

```

```

where b is a named expression, i an identifier,
and e~ and e2 are expressions.
A data stream declaration is a string of the
form
data stream p = 1

```

```

where p is a data stream identifier, and 1 is a
list of data expressions. The items of a data
stream are obtained as follows:

1. If the first expression l~ on the current
   list l~, li, -.. , In is a unit data expres-
   sion, then l~ is taken as the next item of

```

the stream, and the list l~, ..., l~ is
used to obtain successive items.

2. If the first expression l~ on the current list
   l~, l~, • • • , l~ is an iterative data expres-
   sion of the form:
   bfori:-- eltoe2
   then let n~ and n2 be the current val-
   ues of el and e2:
   a) if nl # n2, then i is assigned the value
   n~, b is taken as the next item of
   the stream, and the list
   b for i := (el±l) to e2, lj, ... , In
   is used to obtain subsequent items
   (here (e2 + 1) is used when ni<n2,
   and (e1-1) is used when nl>n2.); or
   b) if n, =n2, i is assigned the value nl, b
   is taken as the next item of the
   stream, and the list lj, ... , l~ is used
   to obtain successive items.
   A command is either an input, command, an
   output command, an assignment command,
   or an iteration command.
   Input and output commands are either of
   the strings input (1, d) or output (l, d),
   where l is a layout stream identifier, and d
   is a data stream identifier. An input or out-
   put command is executed as follows:
1. The next item on the layout stream l is
   obtained; a) if the layout item is of the

```

form rb or rl, where r is a replicator, a
spacing input or output action takes place
(see Table II) and step (1) is repeated; or
b) if the layout item is of the form rd,
the next item on the data stream d is
obtained, a data input or output action
takes place (see Table II), and step (1)
is repeated. If the data stream happens
to be exhausted, it is recycled to obtain
the next item.

2. If the layout stream is exhausted, then,
   if the data stream is not exhausted, the
   layout stream is recycled and step (1) is
   repeated, or, if the data stream is also
   exhausted, the input or output command
   is terminated.
   Note that an input or output command
   terminates only when both the layout and
   data streams are exhausted simultaneously.
   An assignment command is a string of the
   form p := e, where p is a named expression,
   and e is an expression.
   An iteration command is a string of the
   form

```

```

for i := el to e2 do [c]

```

```

where i is an identifier, e~ and e2 are expres-
sions, and c is a sequence of commands. The
execution of an iteration command is as fol-
lows: let n, and n2 be the numerical values

```

```

TABLE II. INPUT/OuTPUT ACTIONS

```

```

Let l~ be the next item on the layout stream, n be the value of the replicator
r for li , and m be the named expression for the next item on the data stream.

```

```

layout Form item oj Action on input A ction on output

```

```

Spacing:
rb

```

```

rl

```

```

The next n characters on the input me-
dium are skipped.

```

```

The remaining characters on the current
line and the next n -- 1 lines on the input
medium are skipped.

```

```

The next n characters oll the output
medium are printed as blanks.

```

```

The remaining characters on the current
line and the next n -- 1 lines on the
output medium are printed as blanks.

```

```

Data:
r(/ The next n characters on the input me-
dium will be treated as a natural num-
ber and will be assigned as the value of
m. If the next n characters are not a
well-formed natural number, the input
action is in violation.

```

```

The leftmost n digits of the value of m
will be placed oil the output medium.
If the value of m can be specified by
fewer than n digits, the number will
be right-juslified with leading zeros
suppressed.

```

```



```

of e~ and e2, and let m be the absolute value
of (n~-n2). The sequence of commands c
is executed (m+ 1) times, and on each itera-
tion the value of the identifier i is succes-
sively set to one of the integer values n~ up
to n2 (if nl ~< n2), or nl down to n2 (if nl >/
n2).

Program Execution
A program consists of a sequence d of
layout and data stream declarations fol-
lowed by a sequence c of commands such
that each layout and data stream identifier
in c is declared once and only once in d.
The commands in a program are executed
sequentially. We take the conventional
meaning for assignment commands and the
operations "+" (addition) and "-" (sub-
traction) for natural numbers. Any attempt
to input or output more than 100 characters
per line is in violation.

EXAMPLE 1 :
layout stream L1 = (4d, 4d, 4d)
data stream D1 = A, B
A:= 11
B:= 22
output (L1, D1)

EXAMPLE 2 :
layout stream L1 = 3d, ll
data stream D1 = N
layout stream L2 = lb, 3d, lb, 3d, ll
data stream D2 = A, B
data stream D3 = B, A
input (L1, D1)
for X := 1 to N do [input (L2, D2)
output (L2, D3)]

```

~XAMPLE 3 :
layout stream L1 = (4S--(J+J))b,
J[4g], ll
data stream D1 = Al[I]forI:= ltoJ
for J := 1 to 2 do [Ai[J] := 1
output(L1, D1)]
for J := 3 to 5 do [Ai[J] := 1
for K := (J--l) to 2
do [AI[K] := (Ai[K]

- All(K-- 1)])]
  output(L1, D1)]

```

```

Ten Mini-Languages • 145

```

```

EXAMPLE 4:
layout stream L1 = (48-(J+J))b, J[4d],
1l
data stream D1 = Ai[I] for I := K
to (K+(J-- 1))
data stream D2 = AI[I] for I := K
to (K-- (J- 1))
K:=i
for J := 1 to 4 do [input (L1, D1)
K := (K+J)]
K := (K-- 1)
for J := 4 to 1 do [output (L1, D2)
K := (K-J)]

```

```

In Example 1, both the layout and data
streams are recycled, and the string printed
on the output medium is:

```

```

11 22 11 22 11 22

```

```

In Example 2, if the first line of the input
device contains a natural number n as its
first three characters, and the next n lines
contain two (appropriately spaced) columns
of numbers, then the two columns are printed
in reverse order on the output medium. For
example, if

```

```

3
1 2
11 22
111 222

```

```

appears oil the input medium, then
2 1
22 11
222 111
will be printed oil tile output medium.
In Example 3, tile first five rows of Pascal's
triangle
1
1 1
1 2 1
1 3 3 1
1 4 6 4 1

```

```

will be printed oil the input medium.
In Example 4, if the first four lines on the
input medium contain an (appropriately
spaced) triangular configuration of numbers,
the configuration is inverted row-wise and
eolummwise on the output medium. For ex-
ample, if

```

```



```

```

1
2 3
4 5 6
7 8 9 10

```

aDDears on the input medium, then

```

10 9 8 7
6 5 4
3 2
1

```

will appear on the output medium.

Discussion
Most programming languages have, more
or less, the same notation for arithmetic
expressions, conditional expressions, assign-
ment commands, and funetions, but the lack
of standardized concepts and notations for
input/output is a major shortcoming. There
appear to be at least two major reasons for
this shortcoming. First, input/output is in-
herently two-dimensional, whereas the speci-
fication of input/output in a programming
language requires a linear representation.
Conceptually, the swapping of two eolumns
of data (Example 2) or the inversion of a
triangular configuration of data (Example 4)
is quite simple because we can intuitively
visualize these transformations geomet-
rically. Requiring a programmer to specify
these transformations in linear terms results
in a loss of the higher-level geometric notions.
The second difficulty is that, in most pro-
gramming languages, input/output must be
described analytically or algorithmieally (as
opposed to synthetically or generatively).
Hence the user who wishes to input several
indefinitely long columns of numbers on the
input medium into an indefinitely long one-
dimensional array must usually describe this
input item by item, keeping traek of the
array index, spacing, and the end of file.

```

ACKNOWLEDGMENTS

```

```

I am grateful to Christopher Strachey for a
generous nip of insight during the prepara-
tion of this paper, to Christopher Wads-
worth for his assistance in clarifying the
issues presented here, and to Daniel Berry

```

```

and John Johnston who provided lively in-
sight into the notion of transfer of control.

```

```

REFERENCES

```

1. CHURCH, ALONZO. "Tile calculi of lambda con-
   version." In Annals o] mathematical studies,
   No. 6, Princeton Univ. Press, Princeton, N. J., 1941.
2. COHEN, KENNETH; AND J. H. WEGSTEIN. "AXLE:
   an axiomatic language for string transforma-
   tions." Comm. ACM 8, ll(Nov. 1965), 657- 661.
3. CURRY, HASKELL B.; AND ROBERT FEYS. Com-
   binatory logic, Vol. 1. North-Holland Publ.
   Co., Amsterdam, The Netherlands, 1958.
4. CARACCIOLO DI FORINO, A. "String processing
   languages and generalized Markov algorithms."
   In Sqymbol manipulation languages and tech-
   niques, D. G. Bobrow (Ed.), North-Holland
   Publ. Co., Amsterdam, The Netherlands, 1968,
   pp. 191-206.
5. HOARE, C. A. R. "Record handling." In Pro-
   gramming languages, F. Genuys (Ed.), Aca-
   demic Press, New York, 1968.
6. JOHNSTON, JOHN B. "The contour model of
   block structured processes." In Proc. o] a Sym-
   posium on Data Structures in Programming
   Languages, J. T. Tou and P. Wegner (Eds.),
   Univ. Florida, Gainesville, Fla., 1971, 55--82.
7. KNUTH, D. E. (ED). "A proposal for input-
   output conventions in ALGOL 60." Comm. ACM
   7, 5(May 1964), 273-283.
8. LANDIN, PETER J. "A correspondence between
   ALGOL 60 and Church's lambda notation."
   Comm. ACM 8, 2(Feb. 1965), 89-101.
   9.--. "The next 700 programming languages."
   Comm. ACM 9, 3(March 1966), 157-164.
9. MARKOV, ANDREI A. Theory o] algorithms. (Rus-
   sian) Academy of Sciences of the USSR, Mos-
   cow, 1954. English translation by Israel Pro-
   gram for Scientific Translations.
10. MORRIS, JAMES H. "X-calculus models of pro-
    gramming languages." (PhD Dissertation)
    Project MAC Technical Report 57, MIT, Cam-
    bridge, Mass., 1968.
11. NAUR, PETER (ED). "Revised report on the al-
    gorithmic language ALGOL 60." Comm. ACM 6,
    l(Jan. 1963), 1-17.
12. QUINE, WILLARD V. Word and object. MIT
    Press, Cambridge, Mass., 1960.
13. SCOTT, DANA. "Outline for a mathematical the-
    orv of computation." Technical Monograph
    PRG-2, Programming Research Group, Oxford
    Univ. Computing Lab., Oxford, England, 1970.
14. STANDISH, THOMAS A. "A data definition facil-
    ity for programming languages." (PhD Disser-
    tation) Carnegie Institute of Technology, Pitts-
    burgh, Pa., 1967.
15. STRACHEY, CHRISTOPHER. "Fundamental con-
    cepts in programming languages." In Proc. oJ
    1967 NATO Summer School, Copenhagen, Den-
    mark, 1967.

```

Camputing Surveys, Vol. 3, No. 3, September 19/1

```

```

```

```

```
