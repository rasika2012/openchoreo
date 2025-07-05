import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, TextField, Typography, InputAdornment, Dialog, DialogTitle, DialogContent, } from '@mui/material';
import * as Generated from './generated/index';
import { Card, CardContent } from '../components';
import { SearchIcon } from '../Icons';
import { useMemo, useState } from 'react';
const GeneratedIcons = Object.entries(Generated);
function IconsPreview() {
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState('');
    const filteredIcons = useMemo(() => GeneratedIcons.filter(([name]) => name.toLowerCase().includes(search.toLowerCase())), [search]);
    return (_jsxs(Box, { display: "flex", flexDirection: "column", gap: (theme) => theme.spacing(3), flexGrow: 1, sx: { p: (theme) => theme.spacing(3) }, children: [_jsxs(Box, { display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", children: [_jsx(TextField, { placeholder: "Search icons...", variant: "outlined", fullWidth: true, size: "medium", onChange: (e) => setSearch(e.target.value), slotProps: {
                            input: {
                                startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(SearchIcon, { fontSize: "inherit", color: "action" }) })),
                            },
                        }, sx: {
                            maxWidth: 400,
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: (theme) => theme.palette.background.paper,
                            },
                        } }), ' ', _jsx(Typography, { variant: "body1", children: `Total Icons = ${GeneratedIcons.length}` })] }), _jsxs(Box, { sx: {
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: '1fr 1fr',
                        md: '1fr 1fr 1fr',
                        lg: '1fr 1fr 1fr 1fr',
                    },
                    gap: (theme) => theme.spacing(2),
                }, children: [filteredIcons.map(([name, Icon]) => (_jsx(Card, { testId: `icon-preview-${name}`, variant: "outlined", style: {
                            height: '100%',
                        }, children: _jsx(CardContent, { paddingSize: "md", children: _jsxs(Box, { display: "flex", flexDirection: "column", alignItems: "center", gap: (theme) => theme.spacing(2), onClick: () => {
                                    setSelectedIcon(name);
                                    setIsOpen(true);
                                }, children: [_jsx(Box, { display: "flex", alignItems: "center", justifyContent: "center", sx: {
                                            p: (theme) => theme.spacing(2),
                                            borderRadius: (theme) => theme.spacing(1),
                                            backgroundColor: (theme) => theme.palette.background.default,
                                            width: 60,
                                            height: 60,
                                            transition: 'transform 0.2s ease-in-out',
                                            '&:hover': {
                                                transform: 'scale(1.1)',
                                            },
                                        }, children: _jsx(Icon, { fontSize: "large", color: "primary" }) }), _jsx(Typography, { variant: "body2", color: "text.secondary", textAlign: "center", sx: {
                                            wordBreak: 'break-word',
                                            fontFamily: (theme) => theme.typography.fontFamily,
                                        }, children: name })] }) }) }, name))), _jsxs(Dialog, { open: isOpen, onClose: () => setIsOpen(false), fullWidth: true, maxWidth: "md", children: [_jsx(DialogTitle, { children: _jsx(Box, { mt: 2, children: _jsx(Typography, { variant: "h3", children: "Import Code" }) }) }), _jsx(DialogContent, { children: _jsx(Box, { height: 100, children: _jsx("code", { className: "importCode", children: `import ${selectedIcon} from 'Icons/generated/${selectedIcon}.tsx';` }) }) })] })] })] }));
}
export default IconsPreview;
//# sourceMappingURL=IconsPreview.js.map