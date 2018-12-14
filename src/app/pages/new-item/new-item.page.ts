import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { ItemService } from '../../services/item.service';

@Component({
  selector: 'new-item',
  templateUrl: './new-item.page.html',
  styleUrls: ['./new-item.page.scss'],
})
export class NewItemPage implements OnInit {

  new_item_form: FormGroup;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.new_item_form = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  async createItem(value) {
    await this.itemService.createItem(value.title, value.description).then(result => {
      console.log('Result from mutation', result);
    });
    this.new_item_form.reset();
    this.goBack();
  }

}
