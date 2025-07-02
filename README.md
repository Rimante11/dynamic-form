# Dynamic Form Application

An Angular application featuring a dynamic form with conditional fields, validation, and multi-step workflow. Built with Angular Material for modern UI components, responsive design and some custom styling.

## Features

### Dynamic Form Functionality
- Required Fields: Name, Surname, Email with proper validation
- Boolean Option: "Are you looking for a job?" (default: true)
- Specialist Level Selection: Junior, Mid, Senior (with conditional logic, read bellow)

### Conditional Fields Based on Selection
- Junior Level: Math question field (2+2 = ?) - only accepts answer "4"
- Mid Level: Description field - cannot contain the letter "a"
- Senior Level: Redirects to submission page with different workflows (read bellow)

### Senior Level Workflow
- If looking for job (boolean: true): Shows success message and "application submitted"
- If not looking for job (boolean: false): Requires cover letter (minimum 140 characters)
- Final submission: Displays complete form data in JSON format

## Technologies Used
- Angular - Latest Angular framework
- Angular Material - UI component library
- TypeScript - Type-safe development
- SCSS - Enhanced styling capabilities
- Reactive Forms - Form handling and validation
- Angular Router - Multi-step navigation
- Custom Validators - Specialized form validation
