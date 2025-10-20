chrome.commands.onCommand.addListener(async (command) => {

  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!activeTab) return;

  const groups = await chrome.tabGroups.query({ windowId: activeTab.windowId });

  switch (command) {

    case "collapse_other_groups":

      for (const group of groups) {
        if (group.id !== activeTab.groupId) {
          await chrome.tabGroups.update(group.id, { collapsed: true });
        }
      }

      break;

    case "collapse_all_groups":

     const anyExpanded = groups.some(group => !group.collapsed);

      if (anyExpanded) {
        for (const group of groups) {
          await chrome.tabGroups.update(group.id, { collapsed: true });
        }
      } else {
        // if All is collapsed then expand the active tab's group (if any)
        if (activeTab.groupId && activeTab.groupId !== chrome.tabGroups.TAB_GROUP_ID_NONE) {
          await chrome.tabGroups.update(activeTab.groupId, { collapsed: false });
        }
      }

      break;
  }
});
