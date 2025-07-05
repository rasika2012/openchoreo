import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, TextField, Typography, InputAdornment, } from '@mui/material';
import * as Images from '.';
import { Card, CardContent } from '../components';
import { SearchIcon } from '../Icons';
import { useMemo, useState } from 'react';
const GeneratedImages = Object.entries(Images);
function ImagePreview() {
    const [search, setSearch] = useState('');
    const filteredIcons = useMemo(() => GeneratedImages.filter(([name]) => name.toLowerCase().includes(search.toLowerCase())), [search]);
    return (_jsxs(Box, { display: "flex", flexDirection: "column", gap: (theme) => theme.spacing(3), flexGrow: 1, sx: { p: (theme) => theme.spacing(3) }, children: [_jsx(TextField, { placeholder: "Search Images...", variant: "outlined", fullWidth: true, size: "medium", onChange: (e) => setSearch(e.target.value), slotProps: {
                    input: {
                        startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(SearchIcon, { fontSize: "inherit", color: "action" }) })),
                    },
                }, sx: {
                    maxWidth: 400,
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: (theme) => theme.palette.background.paper,
                    },
                } }), ' ', _jsx(Box, { sx: {
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: '1fr 1fr',
                        md: '1fr 1fr 1fr',
                        lg: '1fr 1fr 1fr 1fr',
                    },
                    gap: (theme) => theme.spacing(2),
                }, children: filteredIcons.map(([name, Image]) => (_jsx(Card, { testId: `icon-preview-${name}`, variant: "outlined", style: {
                        height: '100%',
                    }, children: _jsx(CardContent, { paddingSize: "md", children: _jsxs(Box, { display: "flex", flexDirection: "column", alignItems: "center", gap: (theme) => theme.spacing(2), children: [_jsx(Box, { display: "flex", alignItems: "center", justifyContent: "center", sx: {
                                        p: (theme) => theme.spacing(2),
                                        borderRadius: (theme) => theme.spacing(1),
                                        backgroundColor: (theme) => theme.palette.background.default,
                                        width: 60,
                                        height: 60,
                                        transition: 'transform 0.2s ease-in-out',
                                        '&:hover': {
                                            transform: 'scale(1.1)',
                                        },
                                    }, children: _jsx(Image, {}) }), _jsx(Typography, { variant: "body2", color: "text.secondary", textAlign: "center", sx: {
                                        wordBreak: 'break-word',
                                        fontFamily: (theme) => theme.typography.fontFamily,
                                    }, children: name })] }) }) }, name))) })] }));
}
export default ImagePreview;
//# sourceMappingURL=ImagePreview.js.map