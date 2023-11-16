namespace TypeExtensions;

public static class StringExtensions
{
    public static bool IsValid(this string value)
    {
        return 
            !string.IsNullOrWhiteSpace(value) || 
            !string.IsNullOrEmpty(value);
    }
}
