import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() id!: any;
  @Input() titulo!: string;
  @Input() categoria!: string;
  @Input() prioridad!: string;
  @Input() status!: string;
  @Input() limite!: any;
  @Input() hora!: string;
  @Input() descripcion!: string;

}
