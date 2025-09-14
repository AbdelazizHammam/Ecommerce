import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  flag: boolean = true;
  @Input() control: any;
  @Input() element: string = 'input';
  @Input() typeInput !: string;
  @Input() idInput !: string;
  @Input() labelInput !: string;
}
