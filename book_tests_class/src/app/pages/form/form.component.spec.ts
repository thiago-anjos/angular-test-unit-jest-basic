import { FormBuilder, FormGroup } from '@angular/forms';
import { FormComponent } from './form.component';

describe('Form component', () => {
  let component: FormComponent;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    formBuilder = new FormBuilder();
    component = new FormComponent(formBuilder);
    component.ngOnInit(); // Chama o método público que utiliza o método privado
  });

  it('Should create componente', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form with the correct controls', () => {
    expect(component.form.controls.name).toBeDefined();
    expect(component.form.controls.email).toBeDefined();
  });

  it('should check if field name with more than 5 characters has errors', () => {
    const nameField = component.form.get('name');
    nameField.setValue('');
    expect(nameField.valid).toBe(false);
  });
  it('should check if field name is valid with less then 5 characters', () => {
    const nameField = component.form.get('name');
    nameField.setValue('done');
    expect(nameField.valid).toBe(true);
  });

  it('shold teste onSave', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    component.onSave();
    expect(consoleLogSpy).toHaveBeenCalledWith('Saved');
  });
});
