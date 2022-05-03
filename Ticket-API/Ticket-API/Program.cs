using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Ticket_API.Data;
using EFCore.BulkExtensions;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<Ticket_APIContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Ticket_APIContext") ?? throw new InvalidOperationException("Connection string 'Ticket_APIContext' not found.")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(corsOption =>
{
    corsOption.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
        policy.AllowAnyOrigin();
    });
});
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
