import React, {createContext, useContext, useState} from 'react';

const tempSettingsContext = createContext();
const updateTempSettingsContext = createContext();

export function useTempSettings() {
  return useContext(tempSettingsContext);
}

export function useUpdateTempSettings() {
  return useContext(updateTempSettingsContext);
}

export const TempSettingsProvidor = ({children}) => {
  const [tempSettings, setTempSettings] = useState({
    modalOpen: false,
  });

  async function updateTempSettings(newSetting, value) {
    await setTempSettings(currentSettings => ({
      ...currentSettings,
      [newSetting]: value,
    }));
  }
  return (
    <tempSettingsContext.Provider value={tempSettings}>
      <updateTempSettingsContext.Provider value={updateTempSettings}>
        {children}
      </updateTempSettingsContext.Provider>
    </tempSettingsContext.Provider>
  );
};
