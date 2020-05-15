export const setTitle = pathTitle => {
  const siteTitle = "音札(おとふだ)";
  const pageTitle = !pathTitle ? siteTitle : pathTitle + " | " + siteTitle;
  return (window.document.title = pageTitle);
};
