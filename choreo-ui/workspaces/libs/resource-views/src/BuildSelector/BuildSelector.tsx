import { useState, useEffect } from 'react';
import { Build } from '@open-choreo/definitions';
import {
  Box,
  Typography,
  Divider,
  Button,
  ButtonContainer,
  SidePanel,
  useChoreoTheme,
} from '@open-choreo/design-system';
import { BuildCard } from '../BuildCard';

export interface BuildSelectorProps {
  builds: Build[];
  onChange: (build: Build) => void;
  onCancel: () => void;
  onSave: () => void;
  selectedBuild: Build;
  open: boolean;
  onOpen: () => void;
}

export function BuildSelector({
  builds,
  onChange,
  selectedBuild,
  onCancel,
  onSave,
  open,
  onOpen,
}: BuildSelectorProps) {
  // Local state for the build selection within the panel
  const [localSelectedBuild, setLocalSelectedBuild] =
    useState<Build>(selectedBuild);

  // Update local state when the external selectedBuild changes or panel opens
  useEffect(() => {
    if (open) {
      setLocalSelectedBuild(selectedBuild);
    }
  }, [open, selectedBuild]);

  const handleClose = () => {
    // Reset local state to external state when cancelling
    setLocalSelectedBuild(selectedBuild);
    onCancel();
  };

  const handleSave = () => {
    // Only update external state when saving
    onChange(localSelectedBuild);
    onSave();
  };

  const theme = useChoreoTheme();
  return (
    <Box position="relative">
      <BuildCard onClick={onOpen} build={selectedBuild} isSelected={false} />
      <Box position="absolute" flexGrow={1}>
        <SidePanel open={open} onClose={handleClose} width={500}>
          <Box
            display="flex"
            flexDirection="column"
            // height="100%"
            flexGrow={1}
            gap={4}
            padding={theme.spacing(2)}
          >
            <Typography variant="h3">Select a Build</Typography>
            <Divider />
            <Box
              display="flex"
              flexDirection="column"
              overflow="auto"
              gap={4}
              padding={1}
              flexGrow={1}
            >
              <Box
                flexGrow={1}
                display="flex"
                flexDirection="column"
                gap={theme.spacing(1)}
              >
                {builds.map((build) => (
                  <BuildCard
                    key={build.uuid}
                    build={build}
                    isSelected={build.uuid === localSelectedBuild.uuid}
                    onClick={() => setLocalSelectedBuild(build)}
                  />
                ))}
              </Box>
            </Box>

            <ButtonContainer testId="build-selector-buttons">
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleSave}
              >
                Save
              </Button>
            </ButtonContainer>
          </Box>
        </SidePanel>
      </Box>
    </Box>
  );
}
