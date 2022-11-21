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

        public static List<USUARIO> ExtraerTodo(string P_Cadena)
        {
            List<USUARIO> lstUsuario = new List<USUARIO>();

            var dpParametros = new
            {
                P_Accion = 1,
            };

            DataTable Dt = Contexto.Funcion_StoreDB(P_Cadena, "spReadAllUsuario", dpParametros);

            lstUsuario = (from item in Dt.AsEnumerable()
                            select new USUARIO
                            {
                                IdUsuario = item.Field<int>("IdUsuario"),
                                Nombre = item.Field<string>("Nombre"),
                                APaterno = item.Field<string>("APaterno"),
                                AMaterno = item.Field<string>("AMaterno"),
                                Usuario = item.Field<string>("Usuario"),
                                Contra = item.Field<string>("Contra"),
                                IsActivo = item.Field<bool>("IsActivo"),
                                FecRegistro = item.Field<string>("FecRegistro")
                            }
                            ).ToList<USUARIO>();

            return lstUsuario;

        }


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

        /*borrado logico*/
        public static List<string> EliminarUsuario(string P_Cadena, USUARIO Usuario)
        {
            List<string> lstValidacion = new List<string>();

            try
            {
                var dpParametros = new
                {
                    IdUsuario = Usuario.IdUsuario
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


        /*NO LOGICO*/
        //public static List<string> EliminarUsuario(string P_Cadena, int IdUsuario)
        //{

        //    List<string> lstValidacion = new List<string>();

        //    try
        //    {
        //        var dpParametros = new
        //        {
        //            IdUsuario = IdUsuario,
        //        };

        //        Contexto.Procedimiento_StoreDB(P_Cadena, "spDeleteUsuarioLOGICO", dpParametros);

        //        lstValidacion.Add("00");
        //        lstValidacion.Add("Registro Guardado con Éxito");
        //    }

        //    catch (SqlException e)
        //    {
        //        lstValidacion.Add("14");
        //        lstValidacion.Add(e.Message);
        //    }

        //    return lstValidacion;

        //}


    }
}