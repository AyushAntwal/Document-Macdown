// schema/Callout.markdoc.js

module.exports = {
    render: 'Callout',
    children: ['paragraph', 'tag', 'list', 'heading', 'code', 'blockquote'],
    attributes: {
      type: {
        type: String,
        default: 'note',
        matches: ['check', 'error', 'note', 'warning']
      }
    }
  };