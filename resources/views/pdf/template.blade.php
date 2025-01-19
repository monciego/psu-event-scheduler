<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        .header {
            text-align: center;
            padding: 10px 0;
            background-color: #f4f4f4;
            border-bottom: 1px solid #ddd;
        }

        .header h1 {
            margin: 0;
            font-size: 18px;
        }

        .content {
            margin: 20px;
            font-size: 16px;
        }

        .content h2 {
            font-size: 16px;
        }

        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        .info-table th,
        .info-table td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
        }

        .info-table th {
            background-color: #f4f4f4;
            font-weight: bold;
            text-align: center;
        }

        .info-table td {
            text-align: center;
        }

        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1>Event Report</h1>
    </div>

    <div class="content">
        <h2>Events</h2>
        <table class="info-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Event Name</th>
                    <th>Event Date</th>
                    <th>Event Time</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($data as $index => $event)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $event->title }}</td>
                    <td>
                        {{ \Carbon\Carbon::parse($event->start)->format('F j, Y')}}
                        to
                        {{ \Carbon\Carbon::parse($event->end)->format('F j, Y')}}
                    </td>
                    <td>{{ $event->start_time }} to {{ $event->end_time }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div class="footer">
        <p>Generated by the system on {{ now()->format('Y-m-d H:i:s') }}</p>
    </div>
</body>

</html>
