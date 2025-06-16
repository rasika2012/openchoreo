# OpenChoreo Console

OpenChoreo Console is the web-based user interface of OpenChoreo, a complete open-source Internal Developer Platform (IDP) built for platform engineering teams. It enables developers to build, deploy, and integrate projects seamlessly, while providing a unified portal experience that streamlines developer workflows and simplifies platform operations

## Project Structure

```
.
├── common/
│   ├── configs/
│   ├── git-hooks/
│   ├── scripts/
│   │   └── (common utility scripts)
│   └── temp/
├── workspaces/
│   ├── apps/
│   │   └── console/
│   │       └── (React shell application)
│   └── libs/
│       ├── design-system/
│       │   └── (UI component library)
│       └── views/
│           └── (UI modules and views)
```

### Directory Descriptions

- **common/**: Contains shared configurations, scripts, and utilities
  - `configs/`: Configuration files
  - `git-hooks/`: Git hook scripts
  - `scripts/`: Common utility scripts
  - `temp/`: Temporary files directory

- **workspaces/**: Main development workspace
  - **apps/**: Application projects
    - `console/`: Main React shell application
  - **libs/**: Shared libraries
    - `design-system/`: UI component library for Choreo
    - `views/`: UI modules and views for the Choreo interface

## Commands

- Install Dependancies: `rush update --purge`
- Build: `rush build`
- Build an speacific project: `rushx build` (on project directory)
- Create a new component/view `rush create -n <name> -t <type>` (type = [component, view, layout])
- Add Icons: 
    - `cd` into `design system` 
    -  copy svg into `workspaces/libs/design-system/src/Icons/svgs`
    - Run `rushx generate-icons`
- Fix Lints `rushx lint`(on project directory)
- Start Mock server
    - `cd` into console project
    - run `rushx mock-serve`
    - Mock server will be start run at port `4010`
- Dev Start: `rushx dev`