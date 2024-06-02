export default (multiple, disabled) => ({
    options: [],
    selected: [],
    multiple: multiple,
    disabled: disabled,
    show: false,
    root: {
        ['x-on:keydown.tab']() {
            return this.close();
        },
        ['x-on:keydown.escape']() {
            return this.close();
        },
    },
    trigger: {
        ['@click']() {
            return this.open();
        },
        [':disabled']() {
            return this.disabled;
        },
    },
    optionList: {
        ['x-show.transition.scale.origin.top']() {
            return this.show;
        },
        ['x-on:click.away']() {
            return this.close();
        },
        ['x-trap.noscroll']() {
            return this.show;
        },
        ['x-anchor']() {
            return this.$refs.select;
        },
        ['x-on:keydown.up.prevent']() {
            return this.$focus.wrap().previous();
        },
        ['x-on:keydown.down.prevent']() {
            return this.$focus.wrap().next();
        },
    },
    init() {
        this.loadOptions();
    },
    open() {
        if (!this.disabled) {
            this.show = true
        }
    },
    isOpen() {
        return this.show
    },
    close() {
        this.show = false
    },
    select(index, event) {
        if (!this.options[index].selected || !this.multiple) {
            if (!this.multiple) {
                for (let i = 0; i < this.selected.length; i++) {
                    this.options[this.selected[i]].selected = false;
                }
                this.selected.length = 0;
            }
            this.options[index].selected = true;
            this.options[index].element = event.target;
            this.selected.push(index);
        } else {
            this.selected.splice(this.selected.lastIndexOf(index), 1);
            this.options[index].selected = false
        }
    },
    remove(index, option) {
        this.options[option].selected = false;
        this.selected.splice(index, 1);
    },
    loadOptions() {
        const options = this.$root.childNodes[1].options;
        let lastSelected = 0;
        for (let i = 0; i < options.length; i++) {
            this.options.push({
                value: options[i].value,
                text: options[i].innerText,
                selected: options[i].getAttribute('selected') != null || i == 0 ? true && this.selected.push(i) : false,
            });
            if (!this.multiple && options[i].getAttribute('selected') != null) {
                this.options[lastSelected].selected = false;
                lastSelected = i;
            }
        }
    },
    selectedValues() {
        return this.selected.map((option) => {
            return this.options[option].value;
        })
    }
})