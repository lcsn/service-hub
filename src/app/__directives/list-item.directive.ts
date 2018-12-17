import { Directive, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appListItem]'
})
export class ListItemDirective implements OnInit {

  color: string;
  cursor: string;

  @HostBinding('style.background-color') _backgroundColor;

  constructor() { }
    
  ngOnInit() {
    this.color = this._backgroundColor;
  }

  @HostListener('mouseenter') mouseenter() {
    this._backgroundColor = 'gray';
  }

  @HostListener('mouseleave') mouseleave() {
    this._backgroundColor = this.color;
  }

}
