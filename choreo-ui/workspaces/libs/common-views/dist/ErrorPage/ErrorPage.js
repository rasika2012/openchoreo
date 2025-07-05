import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Image404NotFound, ImageConsoleError, ImageDefaultError, Typography, useChoreoTheme, } from '@open-choreo/design-system';
import { FormattedMessage } from 'react-intl';
export function ErrorPage(props) {
    var image = props.image, title = props.title, description = props.description;
    var theme = useChoreoTheme();
    return (_jsxs(Box, { padding: theme.spacing(8), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: theme.spacing(4), height: "50vh", children: [image, _jsx(Typography, { variant: "h2", children: title }), _jsx(Typography, { variant: "body1", color: theme.pallet.text.secondary, children: description })] }));
}
function getTitle(code) {
    switch (code) {
        case 'default':
            return _jsx(FormattedMessage, { id: "views.errorPage.default.title", defaultMessage: "Something went wrong" });
        case '404':
            return _jsx(FormattedMessage, { id: "views.errorPage.404.title", defaultMessage: "Page not found" });
        case '500':
            return _jsx(FormattedMessage, { id: "views.errorPage.500.title", defaultMessage: "Server error" });
    }
}
function getDescription(code) {
    switch (code) {
        case 'default':
            return _jsx(FormattedMessage, { id: "views.errorPage.default.description", defaultMessage: "An unexpected error occurred. Please try again later." });
        case '404':
            return _jsx(FormattedMessage, { id: "views.errorPage.404.description", defaultMessage: "The page you are looking for does not exist." });
        case '500':
            return _jsx(FormattedMessage, { id: "views.errorPage.500.description", defaultMessage: "We are experiencing technical difficulties. Please try again in a few minutes." });
    }
}
function getImage(code) {
    switch (code) {
        case 'default':
            return _jsx(ImageDefaultError, {});
        case '404':
            return _jsx(Image404NotFound, {});
        case '500':
            return _jsx(ImageConsoleError, {});
    }
}
export function PresetErrorPage(props) {
    var preset = props.preset;
    return (_jsx(ErrorPage, { description: getDescription(preset), title: getTitle(preset), image: getImage(preset) }));
}
//# sourceMappingURL=ErrorPage.js.map