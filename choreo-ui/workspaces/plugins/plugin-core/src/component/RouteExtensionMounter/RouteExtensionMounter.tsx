import { Route, Routes } from "react-router";
import { PluginExtensionPoint } from "../../plugin-types";
import { useRouteExtentions } from "../../hooks";
import { PresetErrorPage } from "@open-choreo/common-views";

interface RouteExtensionMounterProps {
  extensionPoint: PluginExtensionPoint;
}

export function RouteExtensionMounter(props: RouteExtensionMounterProps) {
  const { extensionPoint } = props;
  const pageEntriesOrgLevel = useRouteExtentions(extensionPoint);
  return (
    <Routes>
      {pageEntriesOrgLevel.map(({ pathPattern, component: Component }) => (
        <Route key={pathPattern} path={pathPattern} element={<Component />} />
      ))}
      <Route path="*" element={<PresetErrorPage preset="404" />} />
    </Routes>
  );
}
