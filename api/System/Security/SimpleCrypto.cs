using System;
using System.Linq;
using System.Text;
using Newtonsoft.Json;

namespace Fractuz.System.Security;
public class SimpleCrypto{
	private const string Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	private string Key;

	protected IConfiguration Config;

	private string Transform(string input, string from, string to){
		var sb = new StringBuilder(input.Length);
		foreach (var c in input)		{
			int index = from.IndexOf(c);
			if (index >= 0){sb.Append(to[index]);}
			else{sb.Append(c);} // Mantém caracteres que não estão no alfabeto
		}
		return sb.ToString();
	}
	public SimpleCrypto(string key,IConfiguration Config)	{
		string? finalKey = null;
		this.Config = Config;

		// sample config["ApplicationSettings:SecurityKey"]
		if(Config.GetSection("ApplicationSettings").Exists()){
			finalKey=Config.GetSection("ApplicationSettings")["SecurityKey"];
		}

		if(string.IsNullOrWhiteSpace(finalKey)){finalKey = Alphabet;}
		key = key + finalKey;

		Key = new string(key.Distinct().ToArray()); // Remove duplicatas da chave
		if (Key.Length < Alphabet.Length){throw new ArgumentException("A chave deve ter pelo menos 62 caracteres distintos.");}
	}

	public string Encrypt(string plaintext){return Transform(plaintext, Alphabet, Key);}

	public string Decrypt(string ciphertext){return Transform(ciphertext, Key, Alphabet);}

}
