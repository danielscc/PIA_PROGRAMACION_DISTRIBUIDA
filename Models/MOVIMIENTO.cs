namespace Models
{
    public class MOVIMIENTO
    {
        public int IdMovimiento { get; set; }
        public int IdTipoMovimiento { get; set; }
        public int CantDolar { get; set; }
        public decimal PUnitario { get; set; }
        public decimal CostoToTal { get; set; }
        public decimal Pago { get; set; }
        public decimal Cambio { get; set; }
        public string FecRegistro { get; set; }
        public int IdUsuario { get; set; }
    }
}