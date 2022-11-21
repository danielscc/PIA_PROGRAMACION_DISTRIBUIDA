using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Models;
using DAL;
using System.Diagnostics.Contracts;

namespace BLl
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
                    Nombre = Usuario.Nombre,
                    APaterno = Usuario.APaterno,
                    AMaterno = Usuario.AMaterno,
                    Usuario = Usuario.Usuario,
                    Contra = Usuario.Contra,
                };

                Contexto.Procedimiento_StoreDB(P_Cadena, "spCreateUsuario", dpParametros);

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

        public static List<string> EditarUsuario(string P_Cadena, USUARIO Usuario)
        {
            List<string> lstValidacion = new List<string>();

            try
            {
                var dpParametros = new
                {
                    IdUsuario = Usuario.IdUsuario,
                    Nombre = Usuario.Nombre,
                    APaterno = Usuario.APaterno,
                    AMaterno = Usuario.AMaterno,
                    Usuario = Usuario.Usuario,
                    Contra = Usuario.Contra
                };

                Contexto.Procedimiento_StoreDB(P_Cadena, "spUpdateUsuario", dpParametros);

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

        public static List<string> EliminarUsuario(string P_Cadena, int IdUsuario)
        {

            List<string> lstValidacion = new List<string>();

            try
            {
                var dpParametros = new
                {
                    IdUsuario = IdUsuario,
                };

                Contexto.Procedimiento_StoreDB(P_Cadena, "spDeleteUsuarioLOGICO", dpParametros);

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