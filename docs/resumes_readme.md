
# Resume File Upload Instructions

To make the dynamic resume download feature work, you need to upload your resume files to the correct location with the exact filenames the application expects.

## 1. Directory

Create a `resumes` folder inside your `public` directory. The final path should be:

`public/resumes/`

## 2. Filenames

Place your five tailored PDF resumes inside this new directory. Each file must be named precisely as follows to match the different roles in the download form:

| Role in Form     | Expected Filename                       |
| ---------------- | --------------------------------------- |
| Developer        | `Sunil_Khobragade_Developer.pdf`        |
| Full-Stack       | `Sunil_Khobragade_FullStack.pdf`        |
| Cyber Security   | `Sunil_Khobragade_CyberSecurity.pdf`    |
| Tech Lead        | `Sunil_Khobragade_Lead.pdf`             |
| Other / General  | `Sunil_Khobragade_General.pdf`          |

**Important:** The filenames are case-sensitive and must match exactly for the downloads to work correctly.

Once you have placed these five files in the `public/resumes/` directory, the resume download feature on your portfolio will be fully functional.
