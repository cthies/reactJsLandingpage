function legacyStickyTabs($: any): void {
  const $mainHeader = $('#header');
  const $pdpTabslist = $('.js-sticky-subnavigation-wrapper');

  if ($pdpTabslist.length === 0) {
    return;
  }

  const $window = $(window);
  const classes = { fixed: 'stickyhax' };
  const tabsHeight = $pdpTabslist.outerHeight(true);
  const $tabsParent = $pdpTabslist.parent();
  const topSpace = 'paddingTop';
  const tabsParentInitialTopSpace = parseInt($tabsParent.css(topSpace));
  const tabsTop = $pdpTabslist.offset().top;

  const $activeLink = $pdpTabslist.find(`a[href="${document.location.pathname}"]`);

  $activeLink.addClass('is-open');
  if ($activeLink.length) {
    $pdpTabslist.find('.tabs-list').animate({ scrollLeft: $activeLink.offset().left });
  }

  function handleScroll(): void {
    const headRect = $mainHeader[0].getBoundingClientRect();
    const headHeight = headRect.top === 0 ? $mainHeader.height() : 0;

    switch (true) {
      case $window.scrollTop() > tabsTop - headHeight:
        $pdpTabslist.addClass(classes.fixed);
        $tabsParent.css(topSpace, tabsParentInitialTopSpace + tabsHeight);
        $pdpTabslist.css('top', headHeight);
        return;
      default:
        $pdpTabslist.removeClass(classes.fixed);
        $tabsParent.css(topSpace, tabsParentInitialTopSpace);
        return;
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

export default legacyStickyTabs;
