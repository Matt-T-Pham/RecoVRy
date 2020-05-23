using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Client
{
    class Connect
    {
        /*
        static void Main(string[] args)
        {
             await doit();
        }
        */
        // HttpClient is intended to be instantiated once per application, rather than per-use. See Remarks.
        static readonly HttpClient client = new HttpClient();

        static async Task Main()
        {
            // Call asynchronous network methods in a try/catch block to handle exceptions.
            try
            {
                HttpResponseMessage response;
                while (true)
                {
                    Console.Write("Trying to connect to website \n");
                    response = await client.GetAsync("http://localhost:3306");
                    response.EnsureSuccessStatusCode();
                    string responseBody = await response.Content.ReadAsStringAsync();
                    // Above three lines can be replaced with new helper method below
                    // string responseBody = await client.GetStringAsync(uri);

                    Console.WriteLine(responseBody);
                    await Task.Delay(1500);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("\nException Caught!");
                Console.WriteLine("Message :{0} ", e.Message);
                Console.Read();
            }
        }
       
    }
}
