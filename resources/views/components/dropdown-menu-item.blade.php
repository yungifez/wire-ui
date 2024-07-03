<div>
    <x-aui::button :attributes="$attributes->class(['relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm
        outline-none transition-colors focus:bg-accent focus:text-accent-foreground w-full'])" role="menu-item"
        size="sm" x-bind="menuItem" variant="ghost">
        {{$slot}}
    </x-aui::button>
</div>
