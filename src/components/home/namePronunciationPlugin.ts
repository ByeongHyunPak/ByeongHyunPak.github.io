const tooltipTargetName = 'Byeonghyun';
const tooltipText = 'pronounced "Byung-hyun"';
const tooltipTargetClassName = 'group relative inline-flex cursor-help border-b border-dotted border-neutral-400 outline-none';
const tooltipClassName = 'pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-72 -translate-x-1/2 rounded-[4px] bg-neutral-900 px-2 py-1.5 text-xs font-normal leading-snug text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus:opacity-100 dark:bg-neutral-100 dark:text-neutral-900';

type HastNode = {
    type?: string;
    value?: string;
    tagName?: string;
    properties?: Record<string, unknown>;
    children?: HastNode[];
};

function textNode(value: string): HastNode {
    return {
        type: 'text',
        value,
    };
}

function tooltipNode(tooltipId: string): HastNode {
    return {
        type: 'element',
        tagName: 'span',
        properties: {
            className: tooltipTargetClassName,
            tabIndex: 0,
            'aria-describedby': tooltipId,
        },
        children: [
            textNode(tooltipTargetName),
            {
                type: 'element',
                tagName: 'span',
                properties: {
                    id: tooltipId,
                    role: 'tooltip',
                    className: tooltipClassName,
                },
                children: [textNode(tooltipText)],
            },
        ],
    };
}

function addTooltipToFirstName(node: HastNode, tooltipId: string, state: { applied: boolean }) {
    if (state.applied || !node.children) {
        return;
    }

    for (let index = 0; index < node.children.length; index += 1) {
        const child = node.children[index];

        if (child.type === 'text' && child.value) {
            const nameIndex = child.value.indexOf(tooltipTargetName);

            if (nameIndex !== -1) {
                const replacementNodes = [
                    textNode(child.value.slice(0, nameIndex)),
                    tooltipNode(tooltipId),
                    textNode(child.value.slice(nameIndex + tooltipTargetName.length)),
                ].filter((replacementNode) => replacementNode.type !== 'text' || replacementNode.value);

                node.children.splice(index, 1, ...replacementNodes);
                state.applied = true;
                return;
            }
        }

        addTooltipToFirstName(child, tooltipId, state);

        if (state.applied) {
            return;
        }
    }
}

export function createNamePronunciationPlugin(tooltipId: string) {
    return function namePronunciationPlugin() {
        return function transform(tree: HastNode) {
            addTooltipToFirstName(tree, tooltipId, { applied: false });
        };
    };
}
