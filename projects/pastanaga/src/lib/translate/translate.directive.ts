import { Directive, ElementRef, Input, AfterViewChecked } from '@angular/core';
import { TranslatePipe } from './translate.pipe';

@Directive({
    selector: '[translate]'
})
export class TranslateDirective implements AfterViewChecked {
    key = '';
    lastParams: any;
    currentParams: any;
    @Input() set translate(key: string) {
        if (key) {
            this.key = key;
            this.checkNodes();
        }
    }
    @Input() set translateParams(params: any) {
        if (!this.compareObj(this.currentParams, params)) {
            this.currentParams = params;
            this.checkNodes(true);
        }
    }
    constructor (
        private eltRef: ElementRef,
        private translatePipe: TranslatePipe
    ) {
    }

    ngAfterViewChecked() {
        this.checkNodes();
    }

    checkNodes(forceUpdate = false) {
        let nodes: NodeList = this.eltRef.nativeElement.childNodes;
        // if the element is empty
        if (!nodes.length) {
            // we add the key as content
            this.setContent(this.eltRef.nativeElement, this.key);
            nodes = this.eltRef.nativeElement.childNodes;
        }
        for (let i = 0; i < nodes.length; ++i) {
            let node: any = nodes[i];
            if (node.nodeType === 3) { // node type 3 is a text node
                let key = '';
                if (this.key) {
                    key = this.key;
                    if (forceUpdate) {
                        node.lastKey = null;
                    }
                } else {
                    let content = this.getContent(node);
                    let trimmedContent = content.trim();
                    if (trimmedContent.length) {
                        if (content !== node.currentValue) {
                            key = trimmedContent;
                            node.originalContent = this.getContent(node);
                        } else if (node.originalContent && forceUpdate) {
                            node.lastKey = null;
                            key = node.originalContent.trim();
                        }
                    }
                }
                this.updateValue(key, node);
            }
        }
    }

    updateValue(key: string, node: any) {
        if (key) {
            if (node.lastKey === key && this.compareObj(this.lastParams, this.currentParams)) {
                return;
            }

            this.lastParams = this.currentParams;

            const translate = this.translatePipe.transform(key);
            if (translate !== key) {
                node.lastKey = key;
            }
            if (!node.originalContent) {
                node.originalContent = this.getContent(node);
            }
            node.currentValue = !!translate ? translate : (node.originalContent || key);
            // we replace in the original content to preserve spaces that we might have trimmed
            this.setContent(node, this.key ? node.currentValue : node.originalContent.replace(key, node.currentValue));
        }
    }

    getContent(node: any): string {
        return !!node.textContent ? node.textContent : node.data;
    }

    setContent(node: any, content: string): void {
        if (!!node.textContent) {
            node.textContent = content;
        } else {
            node.data = content;
        }
    }

    compareObj(obj1: any, obj2: any) {
        Object.entries(obj1).forEach(([key, value]) => {
            let exists = false;
            Object.entries(obj2).forEach(([key2, value2]) => {
                if (key === key2) {
                    if (value === value2) {
                        exists = true;
                    }
                }
            });
            if (!exists) {
                return false;
            }
        });
        return true;
    }
}
