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
/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
const material_1 = require("@mui/material");
const React = __importStar(require("react"));
exports.default = (0, material_1.createSvgIcon)((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [(0, jsx_runtime_1.jsx)("path", { fill: "currentColor", d: "M12.111 13.0958c-.2792 0-.4934.0732-.6495.2089-.157.1364-.234.3053-.234.507s.0771.3713.231.5124c.1512.1387.3643.2121.6482.2121.2747 0 .4885-.0731.6445-.2126.1577-.141.2347-.3104.2347-.5119 0-.2017-.077-.3706-.234-.507-.1564-.136-.3665-.2089-.6409-.2089ZM12.1637 17.3568c.3201-.0081.5697-.0976.7552-.2593.1955-.1705.2941-.382.2941-.6433 0-.262-.0948-.4732-.2898-.6432-.1947-.1697-.4602-.2599-.8037-.2599-.3531 0-.6228.0865-.8171.2519-.1939.1651-.2891.38-.2891.647 0 .2569.0984.4684.294.639.1943.1693.4595.2557.8037.2557h.0486l.0041.0121Z" }), (0, jsx_runtime_1.jsx)("path", { fill: "currentColor", fillRule: "evenodd", d: "M5 0C3.4812 0 2.25 1.2312 2.25 2.75V9.5H2c-1.1046 0-2 .8954-2 2V19c0 1.1046.8954 2 2 2h.25v.25C2.25 22.7688 3.4812 24 5 24h14c1.5188 0 2.75-1.2312 2.75-2.75V21H22c1.1046 0 2-.8954 2-2v-7.5c0-1.1046-.8954-2-2-2h-.25V5.6481a2.75 2.75 0 0 0-.923-2.0553L17.5666.6946A2.75 2.75 0 0 0 15.7396 0H5Zm15.25 9.5V5.6481c0-.357-.1527-.697-.4195-.9342l-3.2604-2.8982a1.2504 1.2504 0 0 0-.8305-.3157H5c-.6904 0-1.25.5596-1.25 1.25V9.5h16.5Zm0 11.5H3.75v.25c0 .6904.5596 1.25 1.25 1.25h14c.6904 0 1.25-.5596 1.25-1.25V21Zm-5.9718-5.4302c-.1654-.2422-.4027-.4397-.7085-.594.2196-.1293.3909-.29.5113-.483.1405-.225.2093-.4898.2093-.7917 0-.4815-.2032-.8872-.6074-1.2137-.4047-.3269-.9307-.4874-1.5719-.4874-.6494 0-1.1801.1603-1.5807.4876-.3998.3265-.603.7321-.603 1.2135 0 .3019.069.5667.2093.7917.1196.1915.2891.3512.5062.48-.303.1506-.5378.3456-.7013.5865-.1849.2725-.2755.5988-.2755.9758 0 .5613.2282 1.031.68 1.4007.4518.3696 1.0423.5514 1.7607.5514.7185 0 1.3089-.1819 1.765-.5557.4557-.3736.6842-.8389.6842-1.3921 0-.3731-.0918-.6973-.2777-.9696Zm1.421-1.7454c-.0042-.5036.217-.9346.6503-1.2859.4338-.3518.9765-.5257 1.6191-.5257.6492 0 1.2189.1516 1.7066.4571.4855.3041.8218.6848 1.0036 1.1472l.0268.0683-1.2426.3594-.0253-.0495c-.1218-.2379-.313-.4288-.573-.5764-.2588-.1469-.5513-.221-.879-.221-.2814 0-.5025.0616-.6725.1794-.1699.1178-.2453.2563-.2453.4131 0 .1156.0417.2134.1271.2969.0872.0852.2225.1576.4115.2133l.0016.0005 1.5239.489c.5401.1632.9618.3712 1.2543.6266.3006.2624.447.6358.447 1.1099 0 .5542-.2379 1.0194-.706 1.3967-.4648.3746-1.0658.5608-1.793.5639l-.0215.0128h-.0187c-.7187 0-1.3371-.1819-1.8473-.5489-.5067-.3645-.8584-.8133-1.052-1.3464l-.0241-.0666 1.2807-.3831.0223.0584c.1234.3229.333.5846.6308.79.2957.204.6502.3072 1.0625.3072.3371 0 .6051-.0744.8092-.2175.2059-.1444.297-.3047.297-.4857 0-.1429-.0521-.2661-.1636-.373-.1128-.1083-.3107-.2108-.6025-.299l-1.5681-.4895c-.4373-.1346-.7864-.34-1.0485-.6135-.2651-.2768-.3956-.6128-.3913-1.008Zm-8.1215 4.5394-1.9074-2.5151-.8316.9122v1.6029H3.5v-6.2361h1.3387v2.8451l2.4891-2.8451h1.7075l-2.4846 2.7388 2.6613 3.4973H7.5777Z", clipRule: "evenodd" })] }), 'MenuKubernetesFilled');
//# sourceMappingURL=MenuKubernetesFilled.js.map