const TabPanel = ({
  children = <></>,
  value = 0,
  index = 0,
}) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
  >
    {children}    
  </div>
);

export default TabPanel;
