# Code Compiler

A web-based code compiler that allows users to write, run, and stop code in different programming languages like JavaScript and Python. This application connects to a WebSocket server to execute the code and display real-time output or error messages.

## Features

- Select between JavaScript or Python as the programming language.
- Write code in a text area.
- Enter input (optional) for the code.
- Execute the code using a "Run" button.
- Stop the code execution anytime.
- View the real-time output or error messages.

## Technologies Used

- **React**: Frontend library for building the user interface.
- **Ant Design**: UI component library for styling.
- **WebSocket**: To establish a real-time connection to the compiler server for code execution.
- **Redux**: For state management (optional, depends on your configuration).

## How to Run the Project

Follow these steps to run the project locally:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd code-compiler
