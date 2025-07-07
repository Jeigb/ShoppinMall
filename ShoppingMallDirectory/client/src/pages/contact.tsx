import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MapPin, Clock, Phone, Mail, Car } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertContactSubmissionSchema } from "@shared/schema";

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      relatedStore: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    contactMutation.mutate(data);
  };

  const subjects = [
    "General Inquiry",
    "Store Information",
    "Event Question", 
    "Feedback",
    "Complaint",
    "Leasing Inquiry"
  ];

  const stores = [
    "Zara",
    "Apple Store",
    "Sephora", 
    "Nike",
    "H&M",
    "Uniqlo"
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Have questions, feedback, or need assistance? We're here to help make your visit perfect
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold text-slate-800 mb-6">Send us a Message</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {subjects.map((subject) => (
                                <SelectItem key={subject} value={subject.toLowerCase().replace(/\s+/g, '-')}>
                                  {subject}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="relatedStore"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Related Store (Optional)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a store" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="">No specific store</SelectItem>
                              {stores.map((store) => (
                                <SelectItem key={store} value={store.toLowerCase()}>
                                  {store}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              rows={4}
                              placeholder="Please provide details about your inquiry..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 mb-6">Visit Us</h2>
              
              {/* Centre Hours */}
              <Card className="mb-8">
                <CardContent className="bg-primary-50 p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <Clock className="text-primary mr-2 h-5 w-5" />
                    Centre Hours
                  </h3>
                  <div className="space-y-2 text-slate-700">
                    <div className="flex justify-between">
                      <span>Monday - Thursday</span>
                      <span className="font-medium">10:00 AM - 9:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Friday - Saturday</span>
                      <span className="font-medium">10:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium">11:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600 pt-2 border-t border-primary-200">
                      <span>Holiday Hours</span>
                      <span>May vary - check website</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Address</h4>
                    <p className="text-slate-600">
                      123 Shopping Boulevard<br />
                      Westfield, NSW 2145<br />
                      Australia
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="text-emerald-600 h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Phone</h4>
                    <a href="tel:+61298765432" className="text-slate-600 hover:text-primary">
                      (02) 9876 5432
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-accent-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="text-accent-600 h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Email</h4>
                    <a href="mailto:info@westfieldplaza.com.au" className="text-slate-600 hover:text-primary">
                      info@westfieldplaza.com.au
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Car className="text-purple-600 h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Parking</h4>
                    <p className="text-slate-600">
                      2,500 spaces available<br />
                      3 hours free with purchase
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h4 className="font-semibold text-slate-800 mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="bg-blue-100 hover:bg-blue-200 text-blue-600 w-10 h-10 rounded-lg flex items-center justify-center transition-colors">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="bg-pink-100 hover:bg-pink-200 text-pink-600 w-10 h-10 rounded-lg flex items-center justify-center transition-colors">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="bg-blue-100 hover:bg-blue-200 text-blue-500 w-10 h-10 rounded-lg flex items-center justify-center transition-colors">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="bg-red-100 hover:bg-red-200 text-red-600 w-10 h-10 rounded-lg flex items-center justify-center transition-colors">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
