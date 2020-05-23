using System;
using System.IO;
using System.IO.Pipes;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

namespace Pipe
{
    class Program
    {
        //  HttpClient is intended to be instantiated once per application, rather than per-use. See Remarks.
        static readonly HttpClient client = new HttpClient();

        static void Main()
        {
            Connect.TalkToWebServer();
            Connect.TalkToUnity();
        }
    }

    class Connect
    {
        static HttpClient UnityClient = new HttpClient();
        static readonly HttpClient WebServerClient = new HttpClient();
        static StringBuilder infoFromWebpage = new StringBuilder();
        static StringBuilder infoToWebpage = new StringBuilder();
        static readonly object fromWebLock = new object();
        static readonly object pinLock = new object();
        static readonly object toWebLock = new object();
        static string overallPin = null; static string tempnow = null;static bool haveSentPin=false;
        public static async Task TalkToWebServer()
        {
            // Call asynchronous network methods in a try/catch block to handle exceptions.
            try
            {
                HttpResponseMessage response;
                String[] temp = null;
                HttpContent toSend = null;
                while (true)
                {
                    response = await WebServerClient.GetAsync("http://localhost:3306/connectvr");
                    //response = await WebServerClient.GetAsync("https://recovry.azurewebsites.net/connectvr");
                    response.EnsureSuccessStatusCode();
                    string responseBody = await response.Content.ReadAsStringAsync();
                    // Above three lines can be replaced with new helper method below
                    // string responseBody = await client.GetStringAsync(uri);

                    Console.WriteLine(responseBody);
                    if (responseBody.Equals("0"))
                    {
                        lock (fromWebLock)
                        {
                            infoFromWebpage.Append(responseBody);
                        }
                    }
                    lock (toWebLock)
                    {
                        if (infoToWebpage.Length > 0)
                        {
                            toSend = new StringContent(infoToWebpage.ToString());

                            infoToWebpage.Clear();
                        }
                    }
                    lock (pinLock)
                    {
                        tempnow = overallPin;

                    }
                    if (tempnow != null && !haveSentPin)
                    {
                        response = await WebServerClient.PutAsync("http://localhost:3306/connectvr", new StringContent(tempnow));
                        response.EnsureSuccessStatusCode();
                        responseBody = await response.Content.ReadAsStringAsync();
                        Console.WriteLine("Response :" + responseBody);
                        haveSentPin = true;
                    }

                    if (toSend != null)
                    {

                        Console.WriteLine("Post");// Console.WriteLine(toSend.ReadAsStringAsync().Result);
                        response = await WebServerClient.PostAsync("http://localhost:3306/connectvr", toSend);
                        //response = await WebServerClient.PostAsync("https://recovry.azurewebsites.net/connectvr", toSend);
                        response.EnsureSuccessStatusCode();
                        responseBody = await response.Content.ReadAsStringAsync();
                        Console.WriteLine("Response :" + responseBody);
                        toSend = null;
                    }
                    await Task.Delay(1500);
                }
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine("\nException Caught!");
                Console.WriteLine("Message :{0} ", e.Message);
                Console.Read();
            }
        }

        public static void TalkToUnity()
        {

            NamedPipeClientStream pipeClient = new NamedPipeClientStream(".", "testpipe", PipeDirection.InOut);
            Console.WriteLine("Wating for Connection.....");
            pipeClient.Connect();
            Console.WriteLine("Connection made!");
            byte[] fromWebBuffer;
            byte[] toWebBuffer;
            string temp = null;
            byte[] size;
            byte[] pin = null;
            try
            {
                while (pipeClient.IsConnected)
                {

                    temp = null;
                    lock (fromWebLock)
                    {
                        if (infoFromWebpage.Length > 0)
                        {
                            temp = infoFromWebpage.ToString();
                            infoFromWebpage.Clear();
                        }
                    }
                    if (temp != null)
                    {

                        //fromWebBuffer = Encoding.ASCII.GetBytes(temp);
                        //int len = fromWebBuffer.Length;

                        //pipeClient.Write(fromWebBuffer, 0, len);
                        temp = null;
                    }
                    if (pin == null)
                    {
                        pin = new byte[4];
                        Console.WriteLine("Gonna Read Pin: ");
                        pipeClient.Read(pin, 0, pin.Length);
                        lock (pinLock)
                        {
                            overallPin = BitConverter.ToInt32(pin, 0).ToString();
                            Console.WriteLine(overallPin);
                        }
                        pipeClient.Flush();
                    }
                    size = new byte[4];

                    Console.WriteLine("Gonna Read Size: ");
                    pipeClient.Read(size, 0, size.Length);
                    pipeClient.Flush();
                    //Console.WriteLine(size[0].ToString() + size[1].ToString() + size[2].ToString() + size[3].ToString() + size[4].ToString() + size[5].ToString());
                    string temps;
                    int s = BitConverter.ToInt32(size, 0);

                    //toWebBuffer = new byte[(817398)];
                    toWebBuffer = new byte[s];
                    Console.WriteLine("\t" + s);
                    pipeClient.Flush();



                    pipeClient.Read(toWebBuffer, 0, toWebBuffer.Length);
                    temps = Encoding.ASCII.GetString(toWebBuffer);
                    Console.WriteLine("Pipe read read\n" + temps.Length);
                    lock (toWebLock)
                    {
                        infoToWebpage.Append(temps);
                    }
                    // Console.WriteLine(Encoding.ASCII.GetString(toWebBuffer));
                    pipeClient.Flush();
                }


            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                pipeClient.Close();
                Console.Read();
            }
        }
    }
}

//temp = new string[0];
//lock (toWebLock)
//{
//    if (infoToWebpage.Length > 0)
//    {
//        temp = Regex.Split(infoToWebpage.ToString(), Environment.NewLine);
//        infoToWebpage.Clear();
//    }
//}
//foreach (String now in temp)
//{
//    HttpContent toSend = new StringContent(now, Encoding.UTF8);
//    response = await WebServerClient.PutAsync("http://recovry.azurewebsites.net/connectvr", toSend);
//    response.EnsureSuccessStatusCode();
//}

//toWebBuffer = new byte[256];

//lock (toWebLock)
//{

//    try
//    {
//        pipeClient.Read(toWebBuffer, 0, toWebBuffer.Length);
//        Console.WriteLine(Encoding.ASCII.GetString(toWebBuffer));
//        pipeClient.Flush();
//    }
//    catch (Exception e)
//    {
//        Console.WriteLine(e);


//    }
//}