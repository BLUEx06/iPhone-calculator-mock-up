# iPhone calculator clone

Just a clone to the calculator on your phone.

<br>

## Install

**No installation needed**

Download it, and open it with your browser.

<br>

## How to Use

Operate it with your keyboard or mouse.

- For keyboard: keydown event(still working on it)
- For mouse: onclick event

<br>

## Naming Convention

- Prior: multiplication & division that you want to deal with first
- secondary: addition and subtraction that you deal with later

<br>

This is where you store the operator and value before you calculate them

`const operator = {}` &
`const value = {}`

<br>

## What it looks like

![](/assets/screenshot_01.png)

<br>

## Note

This calculator is set to be precise for 6 digits after decimal point

`Number.prototype.toPrecision(6)`

<br>

## Terms

### PEMDAS Rule

The order of operations for mathematical expressions

1. **P**arentheses
2. **E**xponents
3. **M**ultiplication
4. **D**ivision
5. **A**ddition
6. **S**ubtraction
