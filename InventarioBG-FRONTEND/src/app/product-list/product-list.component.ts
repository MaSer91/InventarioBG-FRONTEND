import { Component, OnInit } from '@angular/core';
//import { ProductService } from '../../services/product.service';
import { ProductService } from '../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  searchText: string = '';
  loading = false;

  constructor(private productService: ProductService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe(
      (products) => {
        this.dataSource.data = products;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.snackBar.open('Error al cargar productos.', 'Cerrar', { duration: 3000 });
      }
    );
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.snackBar.open('Producto eliminado.', 'Cerrar', { duration: 3000 });
        this.fetchProducts();
      },
      (error) => {
        this.snackBar.open('Error al eliminar el producto.', 'Cerrar', { duration: 3000 });
      }
    );
  }

  addProduct(): void {
    // Implementar lógica para abrir un formulario modal para agregar productos
  }

  editProduct(product: any): void {
    // Implementar lógica para editar un producto
  }
}
