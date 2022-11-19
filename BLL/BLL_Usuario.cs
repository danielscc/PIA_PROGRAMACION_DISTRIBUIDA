using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Models;
using DAL;

namespace BLL
{
    public class BLL_Usuario
    {

        public static List<string> GuardarUsuario(string P_Cadena, clsUsuario Usuario)
        {
            List<string> lstValidacion = new List<string>();

            try
            {
                var dpParametros = new
                {
                    //P_Nombree = Usuario.Nombre,
                };

                Contexto.Procedimiento_StoreDB(P_Cadena, "spNombre", dpParametros);

                lstValidacion.Add("00");
                lstValidacion.Add("Registro Guardado con Éxito");
            }
            catch (SqlException e)
            {
                lstValidacion.Add("14");
                lstValidacion.Add(e.Message);
            }
            return lstValidacion;
        }


    }

}
