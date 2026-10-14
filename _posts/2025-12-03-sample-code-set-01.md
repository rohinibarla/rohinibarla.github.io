---
layout: post
title: "Sample Code Set - 01"
date: 2025-12-03 06:20
comments: false
categories:
draft: false
---

## 1
```c
#include <stdio.h>

int update(int a) 
{
    a = a * 2;
    return a;
}

int main() 
{
    int a = 5;
    printf("%d ", update(a));
    a = update(a);
    printf("%d", a);
    return 0;
}
```

## 2
```c
#include <stdio.h>

int main() 
{
    int a = 10;
    printf("%d\n", a);
    {
        int a = 25;
        printf("%d\n", a);
    }
    printf("%d\n", a);
    return 0;
}

```

## 3
```c
#include <stdio.h>

int x = 5;

void test() 
{
    int x = 20;
    printf("%d\n", x);
}

void demo() 
{
    printf("%d\n", x);
}

int main() 
{
    printf("%d\n", x);
    test();
    demo();
    printf("%d\n", x);
    return 0;
}
```

## 4
```c
#include <stdio.h>

int main()
{
    int a = 10;
    int b = a + 5;
    printf("%d %d\n", a, b);
    {
        int a = b + 10;
        int b = a * 2;

        a = a + 3;
        b = b - 5;

        printf("%d %d\n", a, b);
    }
    a = a * 2;
    b = b + 20;
    printf("%d %d\n", a, b);
    return 0;
}

```

## 5
```c
#include <stdio.h>

int x = 5;
int y = 3;

void test()
{
    int x = 20;
    y = y + 2;
    x = x + y;
    y = y * 2;
    printf("%d %d\n", x, y);
}

void demo()
{
    int y = 50;
    x = x + 1;
    printf("%d %d\n", x, y);
}

int main()
{
    printf("%d %d\n", x, y);
    x = x * 3;
    y = y + 5;
    test();
    demo();
    printf("%d %d\n", x, y);
    return 0;
}
```
