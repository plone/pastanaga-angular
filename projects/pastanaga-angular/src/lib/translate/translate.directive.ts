import { Directive, ElementRef, Input, AfterViewChecked, OnDestroy } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from './translate.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[translate]',
  standalone: false,
})
export class TranslateDirective implements AfterViewChecked, OnDestroy {
  key = '';
  lastParams?: any;
  currentParams?: any;
  onTranslationChange?: Subscription;

  @Input() set translate(key: string) {
    if (key) {
      this.key = key;
      this.checkNodes();
    }
  }
  @Input() set translateParams(params: any) {
    if (!this.areEquals(this.currentParams, params)) {
      this.currentParams = params;
      this.checkNodes(true);
    }
  }

  constructor(
    private element: ElementRef,
    private translateService: TranslateService,
  ) {
    if (!this.onTranslationChange) {
      this.onTranslationChange = this.translateService.onTranslationChange.subscribe(
        (event: TranslationChangeEvent) => {
          if (event.lang === this.translateService.currentLang) {
            this.checkNodes(true);
          }
        },
      );
    }
  }

  ngAfterViewChecked() {
    this.checkNodes();
  }

  ngOnDestroy() {
    this._cleanUpSubscriptions();
  }

  checkNodes(forceUpdate = false) {
    let nodes: NodeList = this.element.nativeElement.childNodes;
    // if the element is empty
    if (!nodes.length) {
      // we add the key as content
      this.setContent(this.element.nativeElement, this.key);
      nodes = this.element.nativeElement.childNodes;
    }
    for (let i = 0; i < nodes.length; ++i) {
      const node: any = nodes[i];
      // node type 3 is a text node
      if (node.nodeType === 3) {
        const key = this.getKeyAndUpdateNode(forceUpdate, node);
        this.updateValue(key, node);
      }
    }
  }

  private getKeyAndUpdateNode(forceUpdate: boolean, node: any) {
    let key = '';
    if (this.key) {
      key = this.key;
      if (forceUpdate) {
        node.lastKey = null;
      }
    } else {
      const content = this.getContent(node);
      const trimmedContent = content.trim();
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
    return key;
  }

  updateValue(key: string, node: any) {
    if (key) {
      if (node.lastKey === key && !!this.lastParams && this.areEquals(this.lastParams, this.currentParams)) {
        return;
      }

      this.lastParams = this.currentParams;

      const translate = this.translateService.getValue(key, this.currentParams);
      if (translate !== key) {
        node.lastKey = key;
      }
      if (!node.originalContent) {
        node.originalContent = this.getContent(node);
      }
      node.currentValue = !!translate ? translate : node.originalContent || key;
      // we replace in the original content to preserve spaces that we might have trimmed
      this.setContent(node, this.key ? node.currentValue : node.originalContent.replace(key, node.currentValue));
    }
  }

  getContent(node: HTMLElement): string {
    return node.textContent || '';
  }

  setContent(node: HTMLElement, content: string): void {
    node.textContent = content;
  }

  areEquals(obj1: any, obj2: any): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  private _cleanUpSubscriptions() {
    if (typeof this.onTranslationChange !== 'undefined') {
      this.onTranslationChange.unsubscribe();
      this.onTranslationChange = undefined;
    }
  }
}
