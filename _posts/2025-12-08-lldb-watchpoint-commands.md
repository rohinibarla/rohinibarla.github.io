---
layout: post
title: "LLDB Watchpoint Commands"
date: 2025-12-08 06:20
comments: false
categories:
draft: false
---

# --- LLDB Watchpoint Commands ---

```bash
# Set watchpoint on variable (write)
watchpoint set variable myVar
# → Stops when 'myVar' is written.

# Set watchpoint on variable (read + write)
watchpoint set variable -w read_write myVar
# → Stops on both reads and writes.

# Set watchpoint on memory address (write)
watchpoint set expression -w write -- 0xADDRESS
# → Replace 0xADDRESS with actual memory address.

# Set watchpoint on memory address (full expression)
watchpoint set expression -- *(int*)0xADDRESS
# → Stops whenever that memory is accessed.

# List all watchpoints
watchpoint list
# → Shows IDs, conditions, and status.

# Disable / Enable / Delete a watchpoint
watchpoint disable 1
watchpoint enable 1
watchpoint delete 1
# → Use the watchpoint ID shown in `watchpoint list`.
```
