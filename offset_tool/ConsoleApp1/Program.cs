using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Runtime.InteropServices;
using System.Text.RegularExpressions;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

namespace ConsoleApp1
    {
        public class Point3D
        {
            public Point3D(double x, double y, double z)
            {
                X = x;
                Y = y;
                Z = z;
            }

            public double X { get; set; }
            public double Y { get; set; }
            public double Z { get; set; }
        }

        public class Contour
        {
            public List<Point3D> Points { get; set; }
        }

        public class VtkVoxels
        {
            public int XSize { get; set; }
            public int YSize { get; set; }
            public int ZSize { get; set; }
            public List<int[,]> Voxels { get; set; }
        }

        class Program
        {
            static void Main(string[] args)
            {
                // Download these file to c:\temp
                // https://junction-planreview.azurewebsites.net/api/patients/lung/images/1622-Series-CT01/imagevoxels.vtk
                // https://junction-planreview.azurewebsites.net/api/patients/lung/plans/JSu-IM102/dosevoxels.vtk
                // https://junction-planreview.azurewebsites.net/api/patients/lung/images/1622-Series-CT01/structure-contours/Lung-right.vtk
                //
                // This code reads the .vtk voxel files (image and dose) and creates one .png from the image and another one from the dose.
                // The code also reads one structure contour vtk file and parses the contours from it.

                int sliceNumber = 0;
                
                for(;sliceNumber<199;sliceNumber++){
                InitColormapForImageRendering(500, 100);
                    string inputFile1 = @"C:\temp\base.vtk";
                    var imageVoxels = ReadVtkGrid(inputFile1);
                    var bmp = BitmapFromVtkVoxels(imageVoxels, sliceNumber);
                    bmp.Save(@"c:\temp\base"+sliceNumber+".png", System.Drawing.Imaging.ImageFormat.Png);
               
                    InitColormapForDoseRendering();
                    string inputFile2 = @"C:\temp\base3.vtk";
                    var doseVoxels = ReadVtkGrid(inputFile2);
                    bmp = BitmapFromVtkVoxels(doseVoxels, sliceNumber);
                    bmp.Save(@"c:\temp\overlay" + sliceNumber + ".png", System.Drawing.Imaging.ImageFormat.Png);
                    mergeImages(sliceNumber);
                }
                /*{
                    string inputFile3 = @"C:\temp\Lung-right.vtk";
                    var contours = ReadVtkContours(inputFile3);
                    var bmp = BitmapFromVtkContour(contours, sliceNumber);
                    bmp.Save(@"c:\temp\outputContour.png", System.Drawing.Imaging.ImageFormat.Png);
            }*/
            }

            static Color[] colormap_ = new Color[0x10000];
            static int colormapOffset_ = 0;
        static void mergeImages(int sliceNumber)
        {
            Bitmap baseImage;
            Bitmap overlayImage;

            baseImage = (Bitmap)Image.FromFile(@"C:\temp\base" + sliceNumber + ".png");

            overlayImage = (Bitmap)Image.FromFile(@"C:\temp\overlay" + sliceNumber + ".png");

            var finalImage = new Bitmap(overlayImage.Width, overlayImage.Height, PixelFormat.Format32bppArgb);
            var graphics = Graphics.FromImage(finalImage);
            graphics.CompositingMode = CompositingMode.SourceOver;

            graphics.DrawImage(baseImage, 0, 0);
            graphics.DrawImage(overlayImage, 5, 5);
            graphics.DrawImage(overlayImage, -5, -5);
            graphics.DrawImage(overlayImage, -5, 5);
            graphics.DrawImage(overlayImage, 5, -5);
            //save the final composite image to disk
            finalImage.Save(@"C:\temp\final\slice" + sliceNumber + ".jpg", ImageFormat.Jpeg);
        }
        static Bitmap BitmapFromVtkContour(List<Contour>contours, int sliceNumber) {
            /*List<Point3D> points = null;
            foreach(Contour c in contours)
            {
                foreach(Point3D point in c)
                {
                    points.Add(point);
                }
            }
            int xsize = 548;
            int ysize = 548;
            int zsize = 200;

            byte[] pixels = new byte[xsize * 4 * ysize];



            foreach (Point3D p in points)
            {
                if (p.Z == sliceNumber)
                {
                    Color col = colormap_[50];
                    pixels[Convert.ToInt32(p.Y)*ysize+Convert.ToInt32(p.X)] = col.B;
                    pixels[Convert.ToInt32(p.Y) * ysize + Convert.ToInt32(p.X)] = col.G;
                    pixels[Convert.ToInt32(p.Y) * ysize + Convert.ToInt32(p.X)] = col.R;
                    pixels[Convert.ToInt32(p.Y) * ysize + Convert.ToInt32(p.X)] = col.A;
                }
            }
            Bitmap bmp = new Bitmap(xsize, ysize, xsize * 4, System.Drawing.Imaging.PixelFormat.Format32bppArgb,
                  GCHandle.Alloc(pixels, GCHandleType.Pinned).AddrOfPinnedObject());
            return bmp;*/
            return null;

        }



            static Bitmap BitmapFromVtkVoxels(VtkVoxels vtkVoxels, int plane)
            {
                int xsize = vtkVoxels.XSize;
                int ysize = vtkVoxels.YSize;
                int zsize = vtkVoxels.ZSize;

                byte[] pixels = new byte[xsize * 4 * ysize];

                int i = 0;
                for (int y = 0; y < ysize; y++)
                {
                    for (int x = 0; x < xsize; x++)
                    {
                        int hu = vtkVoxels.Voxels[plane][x, y];
                        Color col = colormap_[hu + colormapOffset_];
                        pixels[i++] = col.B;
                        pixels[i++] = col.G;
                        pixels[i++] = col.R;
                        pixels[i++] = col.A;
                    }
                }
                Bitmap bmp = new Bitmap(xsize, ysize, xsize * 4, System.Drawing.Imaging.PixelFormat.Format32bppArgb,
                  GCHandle.Alloc(pixels, GCHandleType.Pinned).AddrOfPinnedObject());
                return bmp;
            }

            static void InitColormapForImageRendering(int window, int level)
            {
                colormapOffset_ = 1000;
                int low = (level - window / 2) + colormapOffset_;
                int high = (level + window / 2) + colormapOffset_;
                double slope = 255.0 / ((double)window);

                for (int i = 0; i < 0x10000; i++)
                {
                    if (i < low)
                        colormap_[i] = Color.FromArgb(255, 0, 0, 0);
                    else if (i > high)
                        colormap_[i] = Color.FromArgb(255, 255, 255, 255);
                    else
                    {
                        double value = ((i - low) * slope);
                        if (value > 255)
                            value = 255;
                        byte greylevel = (byte)(value > 255.0 ? 255 : value);
                        colormap_[i] = Color.FromArgb(255, greylevel, greylevel, greylevel);
                    }
                }
            }

            static void InitColormapForDoseRendering()
            {
                colormapOffset_ = 0;
                int low = 33;
                int high = 60;
                double slope = 400.0 / ((double)(high - low));

                for (int i = 0; i < 255; i++)
                {
                if (i < low)
                    colormap_[i] = Color.FromArgb(0, 0, 0, 0);
                else if (i > high)
                {
                    double value = ((i - low) * slope) + (255 - 200);
                    byte redlevel = (byte)(value > 255.0 ? 255 : value);
                    colormap_[i] = Color.FromArgb(60, redlevel, 0, 0);
                }
                else
                {
                    double value = ((i - low) * slope) + (255 - 200);
                    byte redlevel = (byte)(value > 255.0 ? 255 : value);
                    colormap_[i] = Color.FromArgb(60, 0, 0, redlevel);
                }
                }
            }

            public static VtkVoxels ReadVtkGrid(string inputFile)
            {
                VtkVoxels vtkVoxels = new VtkVoxels();
                vtkVoxels.Voxels = new List<int[,]>();

                using (TextReader reader = new StreamReader(inputFile))
                {
                    string line;
                    Match match;

                    // # vtk DataFile Version 3.0
                    line = reader.ReadLine();
                    // vtk output
                    line = reader.ReadLine();
                    // ASCII
                    line = reader.ReadLine();
                    // DATASET STRUCTURED_POINTS
                    line = reader.ReadLine();

                    // DIMENSIONS 548 548 200
                    line = reader.ReadLine();
                    match = Regex.Match(line, "DIMENSIONS (.*) (.*) (.*)");
                    int xsize = Int32.Parse(match.Groups[1].Value);
                    int ysize = Int32.Parse(match.Groups[2].Value);
                    int zsize = Int32.Parse(match.Groups[3].Value);
                    vtkVoxels.XSize = xsize;
                    vtkVoxels.YSize = ysize;
                    vtkVoxels.ZSize = zsize;

                    // ORIGIN -267.578116 -267.578116 -268
                    line = reader.ReadLine();

                    // SPACING 0.976562 0.976562 2.5
                    line = reader.ReadLine();

                    // POINT_DATA 60060800
                    line = reader.ReadLine();
                    match = Regex.Match(line, "POINT_DATA (.*)");
                    int pointCount = Int32.Parse(match.Groups[1].Value);

                    // SCALARS image_data short 1
                    line = reader.ReadLine();

                    // LOOKUP_TABLE default
                    line = reader.ReadLine();

                    for (int z = 0; z < zsize; z++)
                    {
                        int[,] slice = new int[xsize, ysize];
                        vtkVoxels.Voxels.Add(slice);
                        for (int y = 0; y < ysize; y++)
                        {
                            line = reader.ReadLine();
                            var tokens = line.Split(' ');
                            for (int x = 0; x < xsize; x++)
                            {
                                slice[x, y] = int.Parse(tokens[x]);
                            }
                        }
                    }
                }
                return vtkVoxels;
            }

            public static List<Contour> ReadVtkContours(string inputFile)
            {
                List<Contour> retval = new List<Contour>();

                using (TextReader reader = new StreamReader(inputFile))
                {
                    string line;
                    Match match;

                    // # vtk DataFile Version 3.0
                    line = reader.ReadLine();
                    // vtk output
                    line = reader.ReadLine();
                    // ASCII
                    line = reader.ReadLine();
                    // DATASET POLYDATA
                    line = reader.ReadLine();

                    // POINT_DATA 60060800
                    line = reader.ReadLine();
                    match = Regex.Match(line, "POINTS (.*) FLOAT");
                    int pointCount = Int32.Parse(match.Groups[1].Value);

                    var allPoints = new Point3D[pointCount];
                    for (int i = 0; i < pointCount; i++)
                    {
                        line = reader.ReadLine();
                        var tokens = line.Split(' ');
                        allPoints[i] = new Point3D(Double.Parse(tokens[0]), Double.Parse(tokens[1]), Double.Parse(tokens[2]));
                    }

                    // LINES 57 5468
                    line = reader.ReadLine();
                    match = Regex.Match(line, "LINES (.*) (.*)");
                    int lineCount = Int32.Parse(match.Groups[1].Value);
                    for (int i = 0; i < lineCount; i++)
                    {
                        var contourPoints = new List<Point3D>();
                        line = reader.ReadLine();
                        var tokens = line.Split(' ');
                        int pointsInContour = int.Parse(tokens[0]);
                        for (int n = 0; n < pointsInContour; n++)
                        {
                            contourPoints.Add(allPoints[int.Parse(tokens[n + 1])]);
                        }
                        var contour = new Contour() { Points = contourPoints };
                        retval.Add(contour);
                    }
                }
                return retval;
            }
        }
    }
