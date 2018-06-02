module.exports = {
  title: 'Discover Music Lab',
  description: 'Step by step gude to build a music client app.',
  themeConfig: {
    sidebar: [
      genSidebarConfig('Setup', '/lab/', ['', 'getting-started']),
      genSidebarConfig('Browsing', '/browsing/', [
        'route-config-and-styling', 
        'listing', 
        'filtering', 
        'searching',
        'carousel'
      ]),
      genSidebarConfig('Albums', '/albums/', [
        'route-config-and-styling',
        'listing', 
        'banner'
      ]),
      genSidebarConfig('Playing', '/playing/', [
        'route-config-and-styling',
        'player',
        'social-sharing',
      ])
    ]
  },
  head: [
    ['link', { rel: 'stylesheet', href: `https://fonts.googleapis.com/css?family=Roboto` }]
  ]
}

function genSidebarConfig(title, prefix, children) {
  return {
    title,
    collapsable: false,
    children: children.map(child => prefix + child)
  }
}
