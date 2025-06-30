# Dynamic Form Application

An Angular 15 application featuring a dynamic form with conditional fields, validation, and multi-step workflow. Built with Angular Material for modern UI components and responsive design.

## Features

### Dynamic Form Functionality
- **Required Fields**: Name, Surname, Email with proper validation
- **Boolean Option**: "Are you looking for a job?" (default: true)
- **Specialist Level Selection**: Junior, Mid, Senior with conditional logic

### Conditional Fields Based on Selection
- **Junior Level**: Math question field (2+2 = ?) - only accepts answer "4"
- **Mid Level**: Description field - cannot contain the letter "a"
- **Senior Level**: Redirects to submission page with different workflows

### Senior Level Workflow
- **If looking for job**: Shows success message and "application submitted"
- **If not looking for job**: Requires cover letter (minimum 140 characters)
- **Final submission**: Displays complete form data in JSON format

## Technologies Used

- **Angular 15** - Latest Angular framework
- **Angular Material** - UI component library
- **TypeScript** - Type-safe development
- **SCSS** - Enhanced styling capabilities
- **Reactive Forms** - Form handling and validation
- **Angular Router** - Multi-step navigation
- **Custom Validators** - Specialized form validation

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── senior-submission/     # Senior level submission page
│   ├── services/
│   │   └── form-data.service.ts   # Form data management
│   └── validators/
│       └── custom-validators.ts   # Custom form validators
├── components/
│   └── dynamic-form/              # Main dynamic form component
└── styles.scss                   # Global styles
```

## Getting Started

### Prerequisites
- Node.js (version 16.x or higher)
- npm (version 8.x or higher)
- Angular CLI

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd breezit
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200/`

## Usage

1. **Fill out the form**: Enter your name, surname, and email
2. **Select job status**: Choose whether you're looking for a job
3. **Choose specialist level**: Select Junior, Mid, or Senior
4. **Complete conditional fields**: 
   - Junior: Solve the math question
   - Mid: Write a description without the letter "a"
   - Senior: Proceed to submission page
5. **Submit**: Follow the workflow based on your selections

## Form Validation

- **Email**: Must be a valid email format
- **Required fields**: All main fields are mandatory
- **Math answer**: Must equal 4 for junior level
- **Description**: Cannot contain letter "a" for mid level
- **Cover letter**: Minimum 140 characters for senior level (if not looking for job)

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Angular CLI Information

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.11.

For more help on the Angular CLI use `ng help` or check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
