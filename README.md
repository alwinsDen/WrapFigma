## Wrap Plugin

References:

- https://www.figma.com/plugin-docs/api/figma/
- https://www.figma.com/plugin-docs/api/figma/plugin-api-reference/

Notes:

- When extending types like `SceneNode` you need to use the `SceneNodeMixin` instead to avoid type errors. Same for all other types. NOT NEEDED ALL THE TIME.
- "export" keyword breaks the plugin.
