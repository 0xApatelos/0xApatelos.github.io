# Newton–Raphson Calculator

A **Java Swing desktop application** created as an object-oriented programming coursework project. It demonstrates a Newton–Raphson update for a fixed polynomial through a graphical interface.

> Scope: this is a learning project, not a general-purpose equation solver. The current calculation performs one update per supplied input rather than iterating automatically to convergence.

## Mathematical model

```text
f(x)  = x³ − 2x² + x − 3
f′(x) = 3x² − 4x + 1

x_next = x − f(x) / f′(x)
```

For example, an input of `2` gives `f(2) = -1`, `f′(2) = 5`, and `x_next = 2.2`.
This is an example of one update, not the final root.

## Architecture

| Source | Responsibility |
| --- | --- |
| `src/FinalProject/Main.java` | Application entry point; opens the Swing home window. |
| `src/FinalProject/HomeFrame.java` | Accepts the initial value and invokes the calculation. |
| `src/FinalProject/Hitung.java` | Implements the calculation using the `Rumus` interface. |
| `src/FinalProject/Rumus.java` | Interface defining the Newton calculation method. |
| `src/FinalProject/FrameHitung.java` | Result-view UI. |

The project includes NetBeans `.form` files and an Ant build configuration.

## Open and run

### Requirements

- JDK **21**, matching `javac.source` / `javac.target` in `nbproject/project.properties`.
- A desktop environment for Swing.
- NetBeans with Java project support, or Apache Ant.

```bash
git clone https://github.com/0xApatelos/Newton-Rhapson-Calculator.git
cd Newton-Rhapson-Calculator
```

### NetBeans

1. Open the project folder.
2. Set the Java platform to JDK 21.
3. In **Project Properties → Run**, set **Main Class** to `FinalProject.Main`.
4. Clean and build, then run the project.

**Why step 3 matters:** the checked-in configuration currently names `Tes.FrameTes`, which does not exist in the current `src/` tree. The actual entry point is `FinalProject.Main`.

### Ant alternative

```bash
ant -Dmain.class=FinalProject.Main clean jar
java -cp build/classes FinalProject.Main
```

These instructions were prepared from source inspection, not a completed desktop smoke test. If the local NetBeans platform is not configured, use the IDE path first.

## Current limitations

- Fixed polynomial rather than an editable expression.
- No automatic stopping tolerance or maximum-iteration loop.
- No guard for zero/near-zero derivative: `x = 1` and `x = 1/3` are problematic.
- Non-numeric input is parsed directly and needs validation.
- Calculation results are passed through static fields on the UI class, coupling the model to the view.
- No automated numerical tests have been verified.

## Suggested improvements

- Return a result object from a UI-independent solver class.
- Add derivative checks, input validation, iteration limits, and convergence criteria.
- Add JUnit tests for valid inputs, invalid inputs, and failure cases.
- Add an actual application screenshot and a short usage demonstration.
- Stop tracking `build/`, JVM crash logs, and `nbproject/private/` settings. Audit those local files for personal paths before sharing further.

Keep the existing repository URL for now; the display title uses the standard spelling **Newton–Raphson**.
