﻿using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TechRSSReader.Infrastructure.Identity;
using TechRSSReader.Infrastructure.Persistence;

[assembly: HostingStartup(typeof(TechRSSReader.WebUI.Areas.Identity.IdentityHostingStartup))]
namespace TechRSSReader.WebUI.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
            });
        }
    }
}