"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Generated = __importStar(require("./generated/index"));
const components_1 = require("@design-system/components");
const Icons_1 = require("@design-system/Icons");
const react_1 = require("react");
const GeneratedIcons = Object.entries(Generated);
function IconsPreview() {
    const [search, setSearch] = (0, react_1.useState)('');
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [selectedIcon, setSelectedIcon] = (0, react_1.useState)('');
    const filteredIcons = (0, react_1.useMemo)(() => GeneratedIcons.filter(([name]) => name.toLowerCase().includes(search.toLowerCase())), [search]);
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", flexDirection: "column", gap: (theme) => theme.spacing(3), flexGrow: 1, sx: { p: (theme) => theme.spacing(3) }, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { placeholder: "Search icons...", variant: "outlined", fullWidth: true, size: "medium", onChange: (e) => setSearch(e.target.value), slotProps: {
                            input: {
                                startAdornment: ((0, jsx_runtime_1.jsx)(material_1.InputAdornment, { position: "start", children: (0, jsx_runtime_1.jsx)(Icons_1.SearchIcon, { fontSize: "inherit", color: "action" }) })),
                            },
                        }, sx: {
                            maxWidth: 400,
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: (theme) => theme.palette.background.paper,
                            },
                        } }), ' ', (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body1", children: `Total Icons = ${GeneratedIcons.length}` })] }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: '1fr 1fr',
                        md: '1fr 1fr 1fr',
                        lg: '1fr 1fr 1fr 1fr',
                    },
                    gap: (theme) => theme.spacing(2),
                }, children: [filteredIcons.map(([name, Icon]) => ((0, jsx_runtime_1.jsx)(components_1.Card, { testId: `icon-preview-${name}`, variant: "outlined", style: {
                            height: '100%',
                        }, children: (0, jsx_runtime_1.jsx)(components_1.CardContent, { paddingSize: "md", children: (0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", flexDirection: "column", alignItems: "center", gap: (theme) => theme.spacing(2), onClick: () => {
                                    setSelectedIcon(name);
                                    setIsOpen(true);
                                }, children: [(0, jsx_runtime_1.jsx)(material_1.Box, { display: "flex", alignItems: "center", justifyContent: "center", sx: {
                                            p: (theme) => theme.spacing(2),
                                            borderRadius: (theme) => theme.spacing(1),
                                            backgroundColor: (theme) => theme.palette.background.default,
                                            width: 60,
                                            height: 60,
                                            transition: 'transform 0.2s ease-in-out',
                                            '&:hover': {
                                                transform: 'scale(1.1)',
                                            },
                                        }, children: (0, jsx_runtime_1.jsx)(Icon, { fontSize: "large", color: "primary" }) }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body2", color: "text.secondary", textAlign: "center", sx: {
                                            wordBreak: 'break-word',
                                            fontFamily: (theme) => theme.typography.fontFamily,
                                        }, children: name })] }) }) }, name))), (0, jsx_runtime_1.jsxs)(material_1.Dialog, { open: isOpen, onClose: () => setIsOpen(false), fullWidth: true, maxWidth: "md", children: [(0, jsx_runtime_1.jsx)(material_1.DialogTitle, { children: (0, jsx_runtime_1.jsx)(material_1.Box, { mt: 2, children: (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h3", children: "Import Code" }) }) }), (0, jsx_runtime_1.jsx)(material_1.DialogContent, { children: (0, jsx_runtime_1.jsx)(material_1.Box, { height: 100, children: (0, jsx_runtime_1.jsx)("code", { className: "importCode", children: `import ${selectedIcon} from 'Icons/generated/${selectedIcon}.tsx';` }) }) })] })] })] }));
}
exports.default = IconsPreview;
//# sourceMappingURL=IconsPreview.js.map