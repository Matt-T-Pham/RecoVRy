using System;
using System.Collections.Generic;
using System.IO.Pipes;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Connector
{
    class Connector
    {
        // HttpClient is intended to be instantiated once per application, rather than per-use. See Remarks.
        static readonly HttpClient client = new HttpClient();

        static async Task Main()
        {
            NamedPipeClientStream pipeClient = new NamedPipeClientStream(".", "testpipe", PipeDirection.InOut);
            Console.WriteLine("Wating for Connection.....");
            pipeClient.Connect();
            Console.WriteLine("Connection made!");

            while (pipeClient.IsConnected)
            {
                byte[] buffer = new byte[256];
                Thread.Sleep(100);
                pipeClient.Read(buffer, 0, 256);
                Console.WriteLine(Encoding.ASCII.GetString(buffer));
                pipeClient.Flush();
                buffer = new byte[256];
           
            }
            pipeClient.Close();
        }

    }
}
