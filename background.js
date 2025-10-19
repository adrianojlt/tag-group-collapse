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

      for (const group of groups) {
        await chrome.tabGroups.update(group.id, { collapsed: true });
      }

      break;
  }
});
