using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Auth0 Vue API", Version = "v1" });
    c.SchemaGeneratorOptions.SupportNonNullableReferenceTypes = true;
    c.CustomSchemaIds(type => type.ToString());
    c.AddSecurityDefinition(
        "Bearer",
        new OpenApiSecurityScheme()
        {
            Name = "Authorization",
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Description =
                "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 1safsfsdfdfd\"",
        }
    );
    c.AddSecurityRequirement(
        new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                new string[] { }
            }
        }
    );
});

builder.Services.AddCors(o =>
{
    o.AddDefaultPolicy(corsBuilder =>
    {
        corsBuilder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost");
        corsBuilder.AllowAnyHeader().AllowAnyHeader();
    });
});

builder.Services
    .AddAuthentication(o =>
    {
        o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(o =>
    {
        o.Authority = $"https://{builder.Configuration["Auth0:Domain"]}";
        o.Audience = builder.Configuration["Auth0:Audience"];
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapGet("/public", () => "everyone has access");

app.MapGet("/secure", () => "Only you have access").RequireAuthorization();


app.Run();
