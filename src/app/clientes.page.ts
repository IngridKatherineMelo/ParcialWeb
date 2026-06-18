import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { ClientesService, Cliente } from './clientes.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage {
  protected clientes = signal<Cliente[]>([]);
  protected loading = signal(false);
  protected error = signal('');
  protected editId = signal<number | null>(null);
  protected nombre = signal('');
  protected correo = signal('');
  protected telefono = signal('');

  private readonly service = inject(ClientesService);

  constructor() {
    this.load();
  }

  protected async load() {
    this.loading.set(true);
    this.error.set('');

    try {
      const response = await lastValueFrom(this.service.list());
      this.clientes.set(response);
    } catch (error) {
      this.error.set('Error cargando clientes.');
    } finally {
      this.loading.set(false);
    }
  }

  protected resetForm() {
    this.editId.set(null);
    this.nombre.set('');
    this.correo.set('');
    this.telefono.set('');
  }

  protected edit(cliente: Cliente) {
    this.editId.set(cliente.id);
    this.nombre.set(cliente.nombre ?? '');
    this.correo.set(cliente.correo ?? '');
    this.telefono.set(cliente.telefono ?? '');
  }

  protected async save() {
    if (!this.nombre()) {
      this.error.set('El nombre es requerido.');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    try {
      const payload = {
        nombre: this.nombre(),
        correo: this.correo(),
        telefono: this.telefono(),
      };

      if (this.editId() !== null) {
        await lastValueFrom(this.service.update(this.editId()!, payload));
      } else {
        await lastValueFrom(this.service.create(payload));
      }

      this.resetForm();
      await this.load();
    } catch (error) {
      this.error.set('Error guardando cliente.');
    } finally {
      this.loading.set(false);
    }
  }

  protected async remove(id: number) {
    if (!confirm('¿Eliminar este cliente?')) {
      return;
    }

    this.loading.set(true);
    this.error.set('');

    try {
      await lastValueFrom(this.service.delete(id));
      await this.load();
    } catch (error) {
      this.error.set('Error eliminando cliente.');
    } finally {
      this.loading.set(false);
    }
  }
}
